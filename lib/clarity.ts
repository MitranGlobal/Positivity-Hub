/**
 * ClarityConvert form that receives the sign-up popup's details.
 *
 * Uses ClarityConvert's own "native form" submit API (Form builder →
 * Integration Options), so each sign-up is a normal submission of the
 * "Contact Form": it shows under Submissions and creates or updates the
 * contact (matched by email), with landing page, UTMs and referrer.
 *
 * The values below are public (they ship in ClarityConvert's own public form
 * page) and can be overridden per environment in Vercel.
 */
export const clarity = {
  apiUrl: process.env.CLARITY_FORM_API_URL || "https://myappzbackend.com/functions/v1/form-api",
  apiKey:
    process.env.CLARITY_FORM_API_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIn0.CJ12IdcxndQO5Ptx2zFbJpE39RwK9bBAi8QkUKqbcIs",
  subAccountId: process.env.CLARITY_SUB_ACCOUNT_ID || "d1cebd31-15dc-4919-8ea2-d2332cafb86c",
  /** "Contact Form" — form.mitranglobal.com/form/contact-form-mw3bb5ca */
  formId: process.env.CLARITY_FORM_ID || "ecdf7a55-f499-4db8-a1ab-8f4f36971e1a",
  /**
   * Popup field → the form field's key in ClarityConvert. If you change a
   * field's type in the form editor its key changes too; update it here.
   */
  fields: {
    childName: "full_name",
    parentName: "first_name",
    mobile: "phone",
    email: "email",
  },
} as const;
