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
import { useRouter } from "@keystone-6/core/admin-ui/router";
import { Head } from "@keystone-6/core/admin-ui/router";
import styled from "styled-components";
import Favicon from "../public/favicon-32x32.png";

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
  // min-width: 325px;
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
  const [state, setState] = useState({ identity: "", secret: "" });
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

  const onSubmit = async (event) => {
    event.preventDefault();

    if (mode !== "signin") return;

    try {
      const { data } = await mutate({
        variables: {
          identity: state.identity,
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
        <H1>Sign In</H1>
        {error && (
          <Notice title="Error" tone="negative">
            {error.message}
          </Notice>
        )}
        {data?.authenticate?.__typename === failureTypename && (
          <Notice title="Error" tone="negative">
            {data?.authenticate.message}
          </Notice>
        )}
        <Stack gap="large">
          <VisuallyHidden as="label" htmlFor="identity">
            {identityField}
          </VisuallyHidden>
          <FormTextField
            id="identity"
            name="identity"
            value={state.identity}
            onChange={(e) => setState({ ...state, identity: e.target.value })}
            placeholder={identityField}
            ref={identityFieldRef}
          />
          {mode === "signin" && (
            <Fragment>
              <VisuallyHidden as="label" htmlFor="password">
                {secretField}
              </VisuallyHidden>
              <FormTextField
                id="password"
                name="password"
                value={state.secret}
                onChange={(e) => setState({ ...state, secret: e.target.value })}
                placeholder={secretField}
                type="password"
              />
            </Fragment>
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
