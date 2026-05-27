export interface TranslationTypes {
  page: {
    home: {
      hello: string;
    };
    setting: {
      breadcrumbs: string;
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
      api: {
        forbidden: string;
        unauthorized: string;
        notFound: string;
        conflict: string;
        internalServerError: string;
        default: string;
      };
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
      tab: string;
    };
    signup: {
      title: string;
      tab: string;
    };
    table: {
      noResults: string;
      noDataResults: string;
      search: string;
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
      createLanguage: string;
      deleteLanguage: string;
      updateLanguage: string;
      name: string;
      iso: string;
      nativeName: string;
      language: string;
      languages: string;
      proficiency: string;
      edit: string;
      delete: string;
      removeLanguage: string;
      confirmRemove: string;
      confirmDeleteLanguage: string;
      cancel: string;
      confirm: string;
      add: string;
      remove: string;
      update: string;
      save: string;
      noData: string;
    };
    skills: {
      currentSkills: string;
      emptyState: string;
      addSkill: string;
      createSkill: string;
      updateSkill: string;
      deleteSkill: string;
      removeSkills: string;
      uncategorized: string;
      name: string;
      type: string;
      categoryLabel: string;
      category: Record<string, string>;
      skill: string;
      skills: string;
      mastery: string;
      edit: string;
      delete: string;
      confirmRemove: string;
      confirmDeleteSkill: string;
      cancel: string;
      confirm: string;
      add: string;
      remove: string;
      update: string;
      save: string;
      noData: string;
    };
    cvs: {
      createCv: string;
      createCvSuccess: string;
      updateCvSuccess: string;
      deleteCvSuccess: string;
      edit: string;
      editCv: string;
      name: string;
      education: string;
      description: string;
      employee: string;
      delete: string;
      deleteCv: string;
      confirmDeleteCv: string;
      cancel: string;
      confirm: string;
      create: string;
      update: string;
      noData: string;
      validation: {
        nameRequired: string;
        educationRequired: string;
        descriptionRequired: string;
      };
    };
    departments: {
      name: string;
      createDepartment: string;
      updateDepartment: string;
      deleteDepartment: string;
      edit: string;
      delete: string;
      cancel: string;
      confirm: string;
      update: string;
      noData: string;
      create: string;
      confirmDeleteDepartment: string;
      toast: {
        created: string;
        updated: string;
        deleted: string;
      };
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
    profile: {
      tabs: {
        profile: string;
        skills: string;
        languages: string;
        cvs: string;
      };
      firstName: string;
      lastName: string;
      department: string;
      position: string;
      selectDepartment: string;
      selectPosition: string;
      uploadAvatar: string;
      uploadAvatarHint: string;
      userAvatarAlt: string;
      initialsUnknown: string;
      memberSince: string;
      verifyEmail: string;
      update: string;
      userNotFound: string;
      avatar: {
        wrongType: string;
        tooLarge: string;
        invalidEncoding: string;
        readFailed: string;
      };
      toast: {
        userUpdated: string;
        profileUpdated: string;
        avatarUpdated: string;
        verificationSent: string;
        verificationFailed: string;
      };
    };
    users: {
      edit: string;
      delete: string;
      viewProfile: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      department: string;
      position: string;
      role: string;
      selectDepartment: string;
      selectPosition: string;
      selectRole: string;
      roleEmployee: string;
      roleAdmin: string;
      cancel: string;
      create: string;
      createUser: string;
      createUserTitle: string;
      update: string;
      updateUser: string;
      updateUserTitle: string;
      updateUserFailed: string;
      deleteUser: string;
      deleteUserTitle: string;
      deleteUserSuccess: string;
      confirmDeleteBefore: string;
      confirmDeleteAfter: string;
      confirm: string;
      emailAlreadyExists: string;
      noData: string;
    };
  };
  theme: {
    device: string;
    light: string;
    dark: string;
  };
}
