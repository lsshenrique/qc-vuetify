import Components from './components'
import VeeValidate, { Validator } from 'vee-validate'
import ptBR from 'vee-validate/dist/locale/pt_BR'

const QCVuetify = {
    install(Vue) {
        Validator.localize({ pt_BR: ptBR })

        Vue.use(VeeValidate, {
            locale: 'pt_BR'
        })

        for (const key in Components) {
            const component = Components[key]
            Vue.component('Qc' + key, component)
        }
    }
}

export default QCVuetify