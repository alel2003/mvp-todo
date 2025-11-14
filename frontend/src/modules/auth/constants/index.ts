export const AUTH_CONTENT = {
  signIn: {
    title: "Login to your account",
    description: "Enter your email below to sign in to your account",
    link: "/sign-up",
    linkText: "Sign Up"
  },
  signUp: {
    title: "Create your account",
    description: "Enter your email below to create your account",
    link: "/sign-in",
    linkText: "Sign In"
  }
} as const

export const AUTH_FIELDS = [
  {
    label: {
      htmlFor: "email",
      title: "Email:"
    },
    input: {
      id: "email",
      type: "email",
      placeholder: "m@example.com",
      value: "email",
      requiredText: "Email is required"
    }
  },
  {
    label: {
      htmlFor: "password",
      title: "Password:"
    },
    input: {
      id: "password",
      type: "password",
      placeholder: "",
      value: "password",
      requiredText: "Password is required"
    }
  },
  {
    label: {
      htmlFor: "repeatPassword",
      title: "Repeat Password:"
    },
    input: {
      id: "repeatPassword",
      type: "password",
      placeholder: "",
      value: "repeatPassword",
      requiredText: "Repeat Password is required"
    }
  }
] as const

export const ERROR_AUTH_MESSAGES = {
  400: "Error during registration",
  401: "Incorrect login or password",
  403: "No access to the resource",
  409: "This email address is already registered.",
  500: "The server is temporarily unavailable.",
  DEFAULT: "An error has occurred, please try again later."
} as const
