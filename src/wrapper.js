import Components from './components'
import VeeValidate, { Validator } from 'vee-validate'
import ptBR from 'vee-validate/dist/locale/pt_BR'

export function install(Vue) {
    if (install.installed) return;

    install.installed = true;

    Validator.localize({ pt_BR: ptBR });

    Vue.use(VeeValidate, {
        locale: 'pt_BR'
    })

    for (const key in Components) {
        const component = Components[key];
        Vue.component('Qc' + key, component);
    }
}

const plugin = {
    install,
};

let GlobalVue = null;

if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}

if (GlobalVue) {
    GlobalVue.use(plugin);
}

// Para permitir o uso como um módulo exportável (npm/webpack/etc.)
export default Components;