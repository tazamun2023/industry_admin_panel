
export default async function ({app, $auth, store, redirect, route }) {

  if(store?.state?.admin.profile === null){

    route.get()

    const data = await store.dispatch("common/FrontGetRequest", {
      params: {},
      token:"",
      api: 'profile'
    })
   /* const data = await store.common.FrontGetRequest({
      params: {},
      token:"",
      api: 'profile'
    });*/

    await store.common.settingSiteData(data)
    store.common.setProfile(data)

    if (data.languages.length) {
      await store.common.getLangData({
        i18n: app.$i18n,
        token: null
      })

      if (store.language.defaultLanguage?.code) {
        app.$i18n.locale = store.language.defaultLanguage?.code
      }
    }

    console.log("Yes data is Null");
  }

  /*if($auth.user){
    redirect('/')
  }*/
}
