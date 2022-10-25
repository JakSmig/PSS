import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

import { SignInVariant } from '../enums';

export const SignInFormVariantContext = createContext<{
  signInVariant: SignInVariant;
  setSignInVariant: Dispatch<SetStateAction<SignInVariant>>;
}>({
  signInVariant: SignInVariant.SignIn,
  setSignInVariant: () => SignInVariant.SignIn,
});

export const ToggleSignInFormContext = createContext<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}>({
  show: false,
  setShow: () => false,
});

export const SignInFormVariantProvider = ({ children }: PropsWithChildren) => {
  const [signInVariant, setSignInVariant] = useState(SignInVariant.SignIn);
  return (
    <SignInFormVariantContext.Provider
      value={{ signInVariant, setSignInVariant }}
    >
      {children}
    </SignInFormVariantContext.Provider>
  );
};

export const ToggleSignInFormProvider = ({ children }: PropsWithChildren) => {
  const [show, setShow] = useState(false);
  return (
    <ToggleSignInFormContext.Provider value={{ show, setShow }}>
      {children}
    </ToggleSignInFormContext.Provider>
  );
};
