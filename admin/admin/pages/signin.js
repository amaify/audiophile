/** @jsxRuntime classic */
/** @jsx jsx */

import { useState, Fragment, useRef, useEffect } from "react";
import { jsx, Stack, VisuallyHidden, H1, H2 } from "@keystone-ui/core";
import { Button } from "@keystone-ui/button";
import { Notice } from "@keystone-ui/notice";

import { useMutation, gql } from "@keystone-6/core/admin-ui/apollo";
import {
  useRawKeystone,
  useReinitContext,
} from "@keystone-6/core/admin-ui/context";
import { z } from "zod";
import { useRouter } from "@keystone-6/core/admin-ui/router";
import { Head } from "@keystone-6/core/admin-ui/router";
import styled from "styled-components";

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom right, #d87d4a 45%, rgba(0, 0, 0, 0.75)),
    linear-gradient(to bottom left, #fbaf85 45%, rgba(251, 175, 133, 0.75));
`;

const LoginLayoutTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  & h1,
  & h2 {
    margin: 0;
    padding: 0;
    color: black;
  }

  & h1 {
    font-size: 3rem;
    font-weight: 500;

    @media only screen and (min-width: 640px) {
      font-size: 3.5rem;
    }
  }

  & h2 {
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 300;
    width: 100%;

    &::before,
    &::after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: 40px;
      height: 1px;
      background: black;
      margin: 0 0.5rem;
    }

    @media only screen and (min-width: 640px) {
      font-size: 1.6rem;

      &::before,
      &::after {
        width: 100px;
      }
    }
  }
`;

const LoginForm = styled.form`
  width: 90%;
  background: #f1f1f1;
  border-radius: 8px;
  padding: 1rem;

  & h1 {
    color: black;
    font-weight: 300;
  }

  @media only screen and (min-width: 640px) {
    width: 600px;
    padding: 2rem;
  }

  @media only screen and (min-width: 1380px) {
    width: 40%;
  }
`;

const FormTextField = styled.input`
  width: 100%;
  background: white;
  font-weight: 500;
  padding: 1rem 0.8rem;
  border-radius: 4px;
  outline: ${(props) => props.$error && "1px solid red"};

  &:focus {
    outline: ${(props) =>
      props.$error ? "1px solid red" : "1px solid #d87d4a"};
  }
`;

const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  & p {
    position: absolute;
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: red;
    right: 0;
    top: -1.3rem;
  }
`;

const FormButton = styled.button`
  width: 160px;
  height: 48px;
  background: #d87d4a;
  color: white;
  text-transform: uppercase;
  transition: background 0.3s;

  &:hover {
    cursor: pointer;
    background: #fbaf85;
  }
`;

function validateInputField({ inputValue, inputType }) {
  if (inputValue !== "" && inputType === "email") {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!mailFormat.test(inputValue)) return "Email not valid";
  }

  if (inputValue !== "" && inputType === "password" && inputValue.length < 6) {
    return "Enter at least 6 characters";
  }

  return "";
}

export default function SigninPage() {
  const signinPageSchemat = {
    identityField: "email",
    secretField: "password",
    mutationName: "authenticateUserWithPassword",
    successTypename: "UserAuthenticationWithPasswordSuccess",
    failureTypename: "UserAuthenticationWithPasswordFailure",
  };

  const {
    identityField,
    secretField,
    mutationName,
    successTypename,
    failureTypename,
  } = signinPageSchemat;
  const mutation = gql`
      mutation($identity: String!, $secret: String!) {
        authenticate: ${mutationName}(${identityField}: $identity, ${secretField}: $secret) {
          ... on ${successTypename} {
            item {
              id
            }
          }
          ... on ${failureTypename} {
            message
          }
        }
      }
    `;

  const [mode, setMode] = useState("signin");
  const [state, setState] = useState({ email: "", secret: "" });
  const [formError, setFormError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const identityFieldRef = useRef(null);
  useEffect(() => {
    identityFieldRef.current?.focus();
  }, [mode]);

  const [mutate, { error, loading, data }] = useMutation(mutation);
  const reinitContext = useReinitContext();
  const router = useRouter();
  const rawKeystone = useRawKeystone();

  // if we are signed in, redirect immediately
  useEffect(() => {
    if (submitted) return;
    if (rawKeystone.authenticatedItem.state === "authenticated") {
      router.push("/");
    }
  }, [rawKeystone.authenticatedItem, router, submitted]);

  useEffect(() => {
    if (!submitted) return;

    // TODO: this is horrible, we need to resolve this mess
    // @ts-ignore
    if (rawKeystone.adminMeta?.error?.message === "Access denied") {
      router.push("/no-access");
      return;
    }

    router.push("/");
  }, [rawKeystone.adminMeta, router, submitted]);

  const validateForm = (e) => {
    const { value, name, type } = e.target;
    const validatedResult = validateInputField({
      inputType: type,
      inputValue: value,
    });
    setFormError((prevState) => ({ ...prevState, [name]: validatedResult }));
  };
  const onInputChange = (e) => {
    const { value, name } = e.target;

    if (!!formError[name]) validateForm(e);
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onInputBlur = (e) => {
    validateForm(e);
  };

  console.log(formError);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (mode !== "signin") return;

    try {
      const { data } = await mutate({
        variables: {
          identity: state.email,
          secret: state.secret,
        },
      });
      if (data.authenticate?.__typename !== successTypename) return;
    } catch (e) {
      console.error(e);
      return;
    }

    await reinitContext();
    setSubmitted(true);
  };

  return (
    <LoginLayout>
      <Head>
        <title>Audiophile - Sign In</title>
      </Head>
      <LoginLayoutTitle>
        <H1>audiophile</H1>
        <H2>the admin console</H2>
      </LoginLayoutTitle>
      <LoginForm onSubmit={onSubmit}>
        <H1 css={{ marginBottom: "1.8rem" }}>Sign In</H1>
        {error && (
          <Notice
            title="Error"
            tone="negative"
            css={{ marginBottom: "1.8rem" }}
          >
            {error.message}
          </Notice>
        )}
        {data?.authenticate?.__typename === failureTypename && (
          <Notice
            title="Error"
            tone="negative"
            css={{ marginBottom: "1.8rem" }}
          >
            {data?.authenticate.message}
          </Notice>
        )}
        <Stack gap="xxlarge">
          <FormGroup>
            <VisuallyHidden as="label" htmlFor="email">
              email
            </VisuallyHidden>
            <FormTextField
              id="email"
              name="email"
              value={state.email}
              onChange={onInputChange}
              onBlur={onInputBlur}
              placeholder="Email"
              type="email"
              $error={!!formError?.email}
              ref={identityFieldRef}
            />
            {formError.email && <p>{formError?.email}</p>}
          </FormGroup>
          {mode === "signin" && (
            <FormGroup>
              <VisuallyHidden as="label" htmlFor="secret">
                {secretField}
              </VisuallyHidden>
              <FormTextField
                id="secret"
                name="secret"
                value={state.secret}
                onChange={onInputChange}
                onBlur={onInputBlur}
                placeholder={secretField}
                $error={!!formError?.secret}
                type="password"
              />
              {formError.secret && <p>{formError?.secret}</p>}
            </FormGroup>
          )}
        </Stack>

        {mode === "forgot password" ? (
          <Stack gap="medium" across>
            <Button type="submit" weight="bold" tone="active">
              Log reset link
            </Button>
            <Button
              weight="none"
              tone="active"
              onClick={() => setMode("signin")}
            >
              Go back
            </Button>
          </Stack>
        ) : (
          <div css={{ marginTop: "1.5rem" }}>
            <FormButton type="submit">
              {!loading || !data?.authenticate?.__typename === successTypename
                ? "Sign In"
                : "loggin in..."}
            </FormButton>
            {/* Disabled until we come up with a complete password reset workflow */}
            {/* <Button weight="none" tone="active" onClick={() => setMode('forgot password')}>
                Forgot your password?
              </Button> */}
          </div>
        )}
      </LoginForm>
    </LoginLayout>
  );
}
