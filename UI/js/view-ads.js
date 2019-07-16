

function getViewBtn() {
  const buttons = [...document.querySelectorAll('.view-btn')];
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const id = button.getAttribute('dataId');
      const response = await fetch(`https://voke-automart.herokuapp.com/api/v1/car/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          token: localStorage.getItem('token'),
        },


      });

      const result = await response.json();
      const section = document.querySelector('.specific-car');
      section.innerHTML = `<div class="car">
      <div class="product--title">
        <h2>${result.data.model}</h2>
      </div>
      <div class="product--body">
        <div class="product--image">
          <img src="${result.data.img_url}">
        </div>
          <div class="product--details">
            <div class="product--price">
              <span class="product--price_price">${result.data.model} 2018</span>
              <span class="product--price_offer">New arrival !</span>
            </div>
            <div class="product--desc">
              <p>${result.data.description}</p>
            </div>
      
                    <div class="product--quantity">
                      <input class="quantity" type="number" placeholder="quantity" min="1" max="10" value="1"></input>
                    </div>
                    <div class="add-to-cart">
                      <button class="btn-car btn--cart">BUY NOW!</button>
                      <button class='btn-car' href='report-ad.html'>REPORT AD</button>
                    </div>
        </div>
      </div>
      </div>`;
    });
  });
}
function signout() {

  localStorage.removeItem('token');
  window.location.href = '.././index.html';
}


async function viewAds() {
  // e.preventDefault();
  let adTemplate;
  const adList = document.querySelector('.column');
  const response = await fetch('https://voke-automart.herokuapp.com/api/v1/car', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      token: localStorage.getItem('token'),
    },


  });
  const result = await response.json();
  console.log(result.data);

  if (result.data.length > 0) {
    for (let i = 0; i < result.data.length; i++) {
      adTemplate += ` <li>
      <div class="img-i">
      <label class="car-state-label">NEW</label>
          <a href="car-details.html"><img src= ${result.data[i].img_url} alt="product"></a>
      </div>
    
      <div class="desc-i">
          <ul class='car-list'>
              <li>&nbsp; NAME: ${result.data[i].model}</li>
              <li>&nbsp; PRICE: NGN${result.data[i].price}</li>
          </ul>
          <h3 class="view-btn" dataId=${result.data[i].id}><a href="#">VIEW CAR</a></h3>
    
      </div>
    </li>`;
    }

    adList.innerHTML = adTemplate;
    getViewBtn();

  }
}
viewAds();
