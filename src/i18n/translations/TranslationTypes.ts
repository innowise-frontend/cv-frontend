export interface TranslationTypes {
  page: {
    home: {
      hello: string;
    };
    setting: {
      theme: string;
      language: string;
      changePassword: string;
      changePasswordButton: string;
      changePasswordSuccess: string;
      changePasswordError: string;
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
      changeNewPasswordError: string;
      changeConfirmPasswordErrorTitle: string;
      selectThemePlaceholder: string;
      selectLanguagePlaceholder: string;
      togglePasswordVisibility: string;
      validation: {
        currentPasswordRequired: string;
        passwordMinLength: string;
        passwordsDoNotMatch: string;
        newPasswordMustDiffer: string;
      };
    };
    error: {
      oops: string;
      goBack: string;
      defaultErrorMessage: string;
      defaultNotFoundMessage: string;
    };
    forgotPassword: {
      title: string;
      subtitle: string;
      emailLabel: string;
      resetPassword: string;
      cancel: string;
      emailDoesNotExist: string;
    };
    login: {
      title: string;
    };
    signup: {
      title: string;
    };
    resetPassword: {
      title: string;
      subtitle: string;
      newPasswordLabel: string;
      confirmPasswordLabel: string;
      submit: string;
      goSignIn: string;
      validation: {
        passwordMinLength: string;
        passwordsDoNotMatch: string;
      };
    };
    languages: {
      currentLanguages: string;
      emptyState: string;
      addLanguage: string;
      deleteLanguage: string;
      updateLanguage: string;
      language: string;
      languages: string;
      proficiency: string;
      delete: string;
      removeLanguage: string;
      confirmRemove: string;
      cancel: string;
      add: string;
      remove: string;
      save: string;
    };
    sidebar: {
      employees: string;
      skills: string;
      languages: string;
      settings: string;
      cvs: string;
      departments: string;
      positions: string;
      projects: string;
    };
  };
  theme: {
    device: string;
    light: string;
    dark: string;
  };
}
