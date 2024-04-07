const wikiapiurl=  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';


const searchs=document.querySelector('.form-control');
const forms=document.querySelector('img');
const results = document.querySelector('.results');

async function checksearch(){
    results.innerHTML= '<div class="loading"></div>';

    try{
        const response = await fetch(wikiapiurl+searchs.value);
        const data=await response.json();
        const result=data.query.search;
        if(result.length<2){
            results.innerHTML =
                '<div class="error">no matching results. Please try again</div>';
            return;
        }
        console.log(result);
        //
        const list=result.map((item) => {
            const {title,snippet,pageid} = item;
            return `<a href="http://en.wikipedia.org/?curid=${pageid} target="_blank"">
            <h4>${title}</h4>
            <p>${snippet}</p>
            </a>`
        }).join('');
        results.innerHTML = `<div class="articles">
            ${list}
          </div>`;


    }
    catch (error) {
        results.innerHTML = '<div class="error"> there was an error...</div>';
    }
    

}
forms.addEventListener("click",checksearch);
