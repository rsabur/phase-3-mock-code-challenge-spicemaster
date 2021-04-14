// write your code here
const spiceBlendCollection = document.querySelector('#spice-images')

function seeSpiceBlends() {
    fetch('http://localhost:3000/spiceblends')
        .then(resp => resp.json())
        .then(spiceArr => {
            spiceArr.forEach(spiceObj => {
                // spiceBlendsHelper(spiceArr[0])
                showAllSpiceBlends(spiceObj)
            })
        })
}

function showAllSpiceBlends(spiceObj) {

    outerDiv = document.createElement('div')
    outerDiv.classList.add('card')
    outerDiv.dataset.id = spiceObj.id

    outerDiv.innerHTML =
        `<img src="${spiceObj.image}"alt="${spiceObj.title}">`

    spiceBlendCollection.append(outerDiv)
}

function spiceBlendsHelper(singleSpice) {
    const blendImage = document.querySelector('.detail-image')
    blendImage.src = singleSpice.image
    blendImage.alt = singleSpice.title


    const blendTitle = document.querySelector('#spice-blend-detail h2')
    blendTitle.textContent = singleSpice.title

    const blendIngredients = document.querySelector('.ingredients-container ul')
    // debugger

    
    while(blendIngredients.children[0]) {
        blendIngredients.children[0].remove()
    }

//     if(blendIngredients.children[0]) {for(let i = 0;i < 4;i++) {
//         // let ingredientChild = blendIngredients.querySelector('li')
//         // ingredientChild.remove()
//         blendIngredients.children[0].remove()
//     }
// }

    console.log(singleSpice.ingredients)
    let a = singleSpice.ingredients
    a.forEach(ingredient => {
        let ingredientList = document.createElement('li')
        ingredientList.textContent = ingredient.name
        blendIngredients.append(ingredientList)
    })
}

// console.log(spiceBlendCollection)

spiceBlendCollection.addEventListener('click', event => {

    const spiceParentDiv = event.target.closest('div.card')
    // console.log(spiceParentDiv)

    fetch(`http://localhost:3000/spiceblends/${spiceParentDiv.dataset.id}`)
        .then(resp => resp.json())
        .then(data => {
            spiceBlendsHelper(data)
        })
})



//----APP Init----//
seeSpiceBlends()