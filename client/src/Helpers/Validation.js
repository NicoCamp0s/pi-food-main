export function validate(post) {
    let errors = {};
    if (!post.name) {
        errors.name = 'Ingresar nombre de la receta'
    }
    if (!post.summary) {
        errors.summary = 'Escribe un breve resumen'
    }
    if (!post.score || post.score < 0 || post.score > 100) {
        errors.score = 'Ingresa un valor de 0 a 100'
    }
    if (!post.healthScore || post.healthScore < 0 || post.healthScore > 100) {
        errors.healthScore = 'Ingresa un valor de 0 a 100'
    }
    if (!post.steps.length) {
        errors.steps = 'Escribe una serie de pasos sobre cómo cocinar la receta'
    }
    if (!post.image) {
        errors.image = 'Ingresar URL de alguna imagen representativa'
    }
    if (!post.diets.length) {
        errors.diets = 'Elige al menos un tipo de dieta'
    }
    return errors;
}
