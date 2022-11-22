const list = document.querySelector('.list');
const quard = document.querySelector('.js-quard'); 

let options = {
    root: null,
    rootMargin: '200px',
    threshold: 1.0
}

let observer = new IntersectionObserver(onload, options);
let page = 0;

function onload(entries, observer) {
    entries.forEach((entry) => {
     if(entry.isIntersecting){
        page+=1
        featchApi(page).then(data => {
            list.insertAdjacentHTML('beforeend', renderMarkup(data.docs))
          if(data.page === data.pages){
            observer.unobserve(quard);
          }
        })
    
     }
   })
    console.log(entries)
    console.log(observer)
}

function featchApi(page = 1) {
    const BASE_URL = "https://the-one-api.dev/v2/character"
    const options= {
        headers: {
            Authorization: "Bearer B51grCrf4UbyvJ2OGlBh "
        }
    }
    return fetch(`${BASE_URL}?limit=300&page=${page}`, options).then(res => {
        if (!res.ok) {
            throw new Error()
        }
        return res.json()
    })
}

featchApi().then(data => {
    list.insertAdjacentHTML('beforeend', renderMarkup(data.docs))
    observer.observe(quard);
}).catch(err => console.log(err))

function renderMarkup(arr) {
    return arr.map(({ name, race }) => `
    <li>
      <h2>${name}</h2>
      <p>${race}</p>
    </li>
    `).join('')
}