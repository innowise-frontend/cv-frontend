export interface TranslationTypes {
  theme: {
    device: string;
    light: string;
    dark: string;
  };
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
      hm: string;
      retry: string;
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
    calendar: {
      previousMonth: string;
      nextMonth: string;
      openCalendar: string;
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
    users: {
      edit: string;
      delete: string;
      view: string;
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
    };
    verifyEmail: {
      title: string;
      subtitle: string;
      confirm: string;
      later: string;
      invalidCode: string;
    };
    languages: {
      currentLanguages: string;
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
    };
    skills: {
      currentSkills: string;
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
      view: string;
      delete: string;
      deleteCv: string;
      confirmDeleteCv: string;
      cancel: string;
      confirm: string;
      create: string;
      update: string;
      validation: {
        nameRequired: string;
        educationRequired: string;
        descriptionRequired: string;
      };
      tabs: {
        details: string;
        skills: string;
        projects: string;
        preview: string;
      };
      projects: {
        addProject: string;
        updateProject: string;
        removeProject: string;
        responsibilities: string;
        add: string;
        update: string;
        edit: string;
        delete: string;
        cancel: string;
        confirm: string;
        confirmRemoveProject: string;
        toast: {
          added: string;
          updated: string;
          removed: string;
        };
      };
      preview: {
        exportPdf: string;
        education: string;
        languageProficiency: string;
        domains: string;
        projects: string;
        roles: string;
        period: string;
        responsibilities: string;
        environment: string;
        professionalSkills: string;
        skillsColumn: string;
        experienceColumn: string;
        lastUsedColumn: string;
        noProjects: string;
        noSkills: string;
        tillNow: string;
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
      create: string;
      confirmDeleteDepartment: string;
      toast: {
        created: string;
        updated: string;
        deleted: string;
      };
    };
    positions: {
      createPosition: string;
      updatePosition: string;
      deletePosition: string;
      name: string;
      position: string;
      edit: string;
      delete: string;
      confirmDeletePosition: string;
      cancel: string;
      confirm: string;
      add: string;
      update: string;
    };
    projects: {
      name: string;
      domain: string;
      description: string;
      startDate: string;
      endDate: string;
      environment: string;
      roles: string;
      createProject: string;
      updateProject: string;
      deleteProject: string;
      create: string;
      update: string;
      edit: string;
      delete: string;
      cancel: string;
      confirm: string;
      confirmDeleteProject: string;
      tillNow: string;
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
        userUpdateFailed: string;
        profileUpdateFailed: string;
        avatarUpdated: string;
        avatarUpdateFailed: string;
        verificationSent: string;
        verificationFailed: string;
      };
    };
  };
}
