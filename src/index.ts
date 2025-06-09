// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi } /* : { strapi: Core.Strapi } */) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],

      async afterCreate(event) {
        const { result } = event;

        try {
          await strapi.documents("api::account.account").create({
            data: {
              username: result.username,
              user: result.id,
              level: 1,
              bio: "",
            },
            status: 'published',
          });
        } catch (error) {
          console.error("Error creating account:", error);
        }
      },
    });
  },
};
