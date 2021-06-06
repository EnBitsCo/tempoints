let state = {
    isFetchingContacts: true,
    isFetchingUser: true,
    contacts: [],
    productos: [],
    zonasTempoints: [],
    elapsed: 0,
    latitud: 0.0,
    longitud: 0.0,
    user: {},
    error: false,
};

const listeners = [];

export default {
    getState() {
        return state;
    },
    setState(newState) {
        state = { ...state, ...newState };
        listeners.forEach(listener => listener());
    },
    onChange(newListener) {
        listeners.push(newListener);
        return () => listeners.filter(listener => listener !== newListener);
    },
};
