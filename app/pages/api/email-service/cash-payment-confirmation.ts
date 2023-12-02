import { formatPrice } from "@/helpers/FormatPrice";
import type { BodyRequest } from ".";

export const cashPaymentConfirmationEmail = ({
  cart,
  clientName
}: Omit<BodyRequest, "total" | "grandTotal" | "paymentMethod" | "email">) => `
  <!DOCTYPE html>
  <html
    lang="en"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="x-apple-disable-message-reformatting" />
      <title></title>
      <style>
        table,
        td,
        div,
        h1,
        p {
          font-family: "Manrope", sans-serif;
          font-weight: 300;
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0;">
      <table
        role="presentation"
        style="
          width: 100%;
          border-collapse: collapse;
          border: 0;
          border-spacing: 0;
          background: #ffffff;
        "
      >
        <tr>
          <td align="center" style="padding: 0;">
            <table
              role="presentation"
              style="
                width: 802px;
                border-collapse: collapse;
                border: 1px solid #cccccc;
                border-spacing: 0;
                text-align: left;
              "
            >
              <tr>
                <td
                  align="center"
                  style="
                    padding: 40px 0 30px 0;
                    height: 250px;
                    background: #1d1a1a;
                  "
                >
                  <h1
                    style="
                      text-transform: uppercase;
                      font-size: 48px;
                      font-weight: 300;
                      padding: 0;
                      margin: 0;
                      color: #f1f1f1;
                    "
                  >
                    audiophile
                  </h1>
                  <p style="color: #fbaf85; font-weight: 300; font-size: 16px;">
                    Your all in one stop to fufill your audio needs
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 36px 30px 42px 30px;">
                  <table
                    role="presentation"
                    style="
                      width: 100%;
                      border-collapse: collapse;
                      border: 0;
                      border-spacing: 0;
                    "
                  >
                  <tr>
                      <td>
                        <p
                          style="color: black; font-size: 20px; font-weight: 400;"
                        >
                          Hi ${clientName},
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 0 36px 0; color: black;">
                        <h1
                          style="
                            font-size: 46px;
                            font-weight: 300;
                            padding: 0;
                            margin: 0;
                          "
                        >
                        Your order is on the way
                        </h1>
                        <p style="font-size: 22px; font-weight: 300;">
                          You will receive a complete invoice after making your cash payment.                      
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0;">
                        <table
                          role="presentation"
                          style="
                            width: 100%;
                            border-collapse: collapse;
                            border: 0;
                            border-spacing: 0;
                          "
                        >
                          <tr>
                            <td style="padding: 0;">
                              <h1 style="font-size: 40px; margin: 0; padding: 0;">
                                Your order
                              </h1>
                              <table
                                role="presentation"
                                style="
                                  width: 100%;
                                  border-collapse: separate;
                                  border: 0;
                                  border-spacing: 0 10px;
                                "
                              >
                                <tr>
                                  <th style="font-size: 20px; font-weight: 400;">
                                    Product(s)
                                  </th>
                                  <th
                                    style="font-size: 20px; font-weight: 400;"
                                    align="center"
                                  >
                                    Quantity
                                  </th>
                                  <th
                                    style="font-size: 20px; font-weight: 400;"
                                    align="center"
                                  >
                                    Price
                                  </th>
                                </tr>
                                ${cart.map(
                                  (cartItem) => `<tr style="text-transform: uppercase;">
                                  <td
                                    style="
                                      font-weight: 300;
                                      font-size: 16px;
                                      color: black;
                                      opacity: 0.7;
                                    "
                                  >
                                    ${cartItem.productTitle} (${formatPrice(cartItem.price) as string})
                                  </td>
                                  <td
                                    style="
                                      font-weight: 300;
                                      font-size: 16px;
                                      color: black;
                                      opacity: 0.7;
                                    "
                                    align="center"
                                  >
                                    ${cartItem.itemCount}
                                  </td>
                                  <td
                                    style="
                                      font-weight: 300;
                                      font-size: 16px;
                                      color: black;
                                      opacity: 0.7;
                                    "
                                    align="center"
                                  >
                                    ${formatPrice(cartItem.totalPrice)}
                                  </td>
                                </tr>`
                                )}
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; background: #d87d4a;">
                  <table
                    role="presentation"
                    style="
                      width: 100%;
                      border-collapse: collapse;
                      border: 0;
                      border-spacing: 0;
                      font-size: 9px;
                      font-family: Arial, sans-serif;
                    "
                  >
                    <tr>
                      <td style="padding: 0; width: 50%;" align="left">
                        <p
                          style="
                            margin: 0;
                            font-size: 16px;
                            font-weight: 300;
                            line-height: 16px;
                            color: white;
                          "
                          id="copyright"
                        >
                          Copyright ${new Date().getFullYear()}. All rights reserved
                        </p>
                      </td>
                      <td style="padding: 0; width: 50%;" align="right">
                        <table
                          role="presentation"
                          style="
                            border-collapse: collapse;
                            border: 0;
                            border-spacing: 0;
                          "
                        >
                          <tr>
                            <td style="padding: 0 0 0 10px; width: 38px;">
                              <a
                                href="http://www.twitter.com/tobymac_"
                                style="color: #ffffff;"
                                ><img
                                  src="https://assets.codepen.io/210284/tw_1.png"
                                  alt="Twitter"
                                  width="38"
                                  style="
                                    height: auto;
                                    display: block;
                                    border: 0;
                                  "
                              /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  
  `;
