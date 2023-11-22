const REGEXES = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    phoneNumber:/^08[789]\d{7}$/i,
    imageUrl: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i,
}

export const isFormValid = (errors) =>{
    return !Object.values(errors).some(x => x);
}

export const minMaxLength = (e, minLength, maxLength, setErrors, values) => {
    setErrors(prevState => ({
        ...prevState,
        [e.target.name]: !e.target.value
        || values[e.target.name].length < minLength
        || values[e.target.name].length > maxLength,
    }))
}

export const minLength = (e, minLength, setErrors, values) => {
    setErrors(prevState => ({
        ...prevState,
        [e.target.name]: !e.target.value || values[e.target.name].length < minLength,
    }))
}

export const maxLength = (e, maxLength, setErrors, values) => {
    setErrors(prevState => ({
        ...prevState,
        [e.target.name]: !e.target.value || values[e.target.name].length > maxLength,
    }))
}

const regexValidation = (e,regex,setErrors) =>{
    setErrors(prevState => ({
        ...prevState,
        [e.target.name]: !regex.test(e.target.value),
    }))
}

export const imageValidation = (e, setErrors) => {
    regexValidation(e, REGEXES.imageUrl, setErrors);
}

export const emailValidation = (e, setErrors) => {
    regexValidation(e, REGEXES.email, setErrors);
}

export const phoneValidation = (e, setErrors) => {
    regexValidation(e, REGEXES.phoneNumber, setErrors);
}