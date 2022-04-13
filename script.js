gsap.from('.navbar', {
    duration: 1.5,
    y: '-100%',
    ease: 'bounce'
})
gsap.from('.jumbotron .img-thumbnail', {
    duration: 1,
    delay: 0.3,
    opacity: 0,
    y: -250,
    ease: 'expo.out'
})
gsap.from('.display-4', {
    duration: 1,
    delay: 0.5,
    x: -100,
    ease: 'back',
    opacity: 0
})
gsap.registerPlugin(TextPlugin)
gsap.to('.lead', {
            duration: 2,
            delay: 0.8,
            text: 'Student | Programmer'
})
AOS.init({
    duration: 1100,
    delay: 50
})