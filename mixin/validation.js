export default {
    data() {
        return {
            allowedImageExtensions: /(\.jpg|\.jpeg|\.png|\.svg|\.webp|\.gif)$/i,
            allowedVideoExtensions: /(\.mp4)$/i,
            allowedExcelExtensions: /(\.xlsx)$/i,
            passwordLength: 6,
            maxImageSize: 1,
            maxExcelSize: 2,
            maxVideoSize: 2,
            reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        };
    },
    methods: {
      isValidExcel (file, size = this.maxExcelSize) {
        if(file.size > size * 1024 * 1024){
          return this.$t('util.fSize', {size: size});
        }else if (!this.allowedExcelExtensions.exec(file.name)) {
          return this.$t('util.invFile');
        }
        return null
      },
        isValidImage (file, size = this.maxImageSize, isImage = true) {
            if(file.size > size * 1024 * 1024){
                return this.$t('util.fSize', {size: size});
            }else if (isImage && !this.allowedImageExtensions.exec(file.name)) {
                return this.$t('util.invFile');
            }else if (!isImage && !this.allowedVideoExtensions.exec(file.name)) {
                return this.$t('util.invFile');
            }
            return null
        },
        isValidEmail (email) {
            return this.reg.test(email)
        },
        isValidLength(password) {
          return (password && (password.length >= this.passwordLength)) || false
        },
    }
}
