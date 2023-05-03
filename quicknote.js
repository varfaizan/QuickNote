let liStr ='';
var myLeads = []
var i=0;



document.addEventListener('DOMContentLoaded',function(){
    const p_chk=document.getElementById('p_chk');
    const mainchk = document.getElementById('mainchk'); 
    const edit_btn=document.getElementById('edit-btn'); 
    const ulEl = document.getElementById('ul-el');
    let chkbx = ulEl.getElementsByClassName('chk');
    const inputBtn = document.getElementById('input-btn');
    const inputEl = document.getElementById('input-el');
    const delBtn = document.getElementById('delete-btn');
    const grabBtn = document.getElementById('grab-btn');
    
    const dload=document.getElementById('download');
    const bdy=document.getElementById('bdy');
    
    bdy.style.background = localStorage.getItem("color");
    dload.disabled = true;
    // p_chk.innerHTML=''
    // p_chk.style.visibility='visible';
        

     let fromLocal = JSON.parse(localStorage.getItem("leads"));
     console.log('fromLocal is:'+fromLocal);
     if(fromLocal){
      
        let newL = fromLocal.length-1;
        for(let i=0;i<fromLocal.length;i++){
          
            myLeads[newL-i]=fromLocal[i]; 
           
        }
        
        // myLeads=fromLocal;
        // let newL = fromLocal.length-1;
        // for(i=0;i<fromLocal.length;i++){
          
        //     myLeads[newL-i]=fromLocal[i]; 
           
        // }
        console.log('myLeads is:'+myLeads);      
        renderLeads();
        ulEl.innerHTML = liStr ;
        dload.disabled = false;
        edit_btn.disabled=false;
        delBtn.disabled=false;


     }

     grabBtn.addEventListener("click",function(){
        chrome.tabs.query({active: true,currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url);
        console.log(myLeads);
        localStorage.setItem('leads',JSON.stringify(myLeads));
        renderLeads();
        console.log('Grab the link')

        })
        })
        
     


     inputBtn.addEventListener("click",function(){
         
        if(inputEl.value==''){
         
            console.log('write Something');
        
       } else{ 
         
             myLeads.push(inputEl.value);
             localStorage.setItem('leads',JSON.stringify(myLeads));
             renderLeads();
             inputEl.value='';
             ulEl.innerHTML = liStr;
      
}

})
    
delBtn.addEventListener("click",function(){
      
  
        bdy.style.background =  getRandomColor();
        let newColor = bdy.style.background;
        localStorage.setItem('color',newColor);
        // ulEl.innerHTML="";
        // localStorage.clear();
        // myLeads=[];
        // i=0;
        // liStr ='';
        // edit_btn.disabled=true;
        // dload.disabled=true;
        // console.log('case1')
       
    })

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
  



function renderLeads(){
  
    console.log('inside function');           
    console.log(myLeads.length);
    
    for(i;i<myLeads.length;i++){

        console.log('inside for'); 

    let demolead = JSON.stringify(myLeads[i]);
    let lnkInd = demolead.indexOf('.');
       // whether . is present to verify its link
        if(lnkInd===-1){
        liStr += 
        `<li> 
            <p>${myLeads[i]}<input type="checkbox" class="chk" ></input> </p>
        </li>` 
           // console.log('case 1');

   }else{
    liStr += 
    `<li>
        <a  
         target="_blank" href="${myLeads[i]}">${myLeads[i]} 
         <input type="checkbox" class="chk" ></input> </a>
    </li>`
    //console.log('case 2');
   }
     
       
     }

}


const el = (sel, par) => (par || document).querySelector(sel);
const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);


// Create file and download it:
const createAndDownload = (content,  type = "text/plain") => {
  const file = new Blob([content], { type });
  const href = URL.createObjectURL(file);
  const elAnchor = elNew("a", { href, download });
  el("body").append(elAnchor);
  elAnchor.click();
  elAnchor.remove();
  URL.revokeObjectURL(href);
};


// Usage example:

    el("#download").addEventListener("click", () => {
       
       
        console.log('Downloading');
        let text= ulEl.textContent;
        console.log(text);
        //console.log(typeof text);
        let extra = text.lastIndexOf("");
        console.log(extra);

       // console.log(text);
       // const text = el("#input-el").value;
        createAndDownload(text, "text/plain");
    });





   

    edit_btn.addEventListener('click',function(){
       
        if(edit_btn.textContent === 'Edit'){
             console.log('Editing');
             inputBtn.disabled=true;
             delBtn.disabled=true;
             grabBtn.disabled=true;
             dload.disabled=true;
           
             for(let i=0;i<chkbx.length;i++){
                chkbx[i].style.visibility = 'visible';
            }
                edit_btn.textContent='Delete';
                p_chk.style.visibility='visible';
                mainchk.style.visibility = 'visible';
                // mainchk.parentElement.textContent="";
               

        } 
        else {
            inputBtn.disabled=false;
             delBtn.disabled=false;
             grabBtn.disabled=false;
            
            p_chk.style.visibility='hidden';
            mainchk.style.visibility = 'hidden';
        if(mainchk.checked){

            localStorage.clear();
            edit_btn.disabled=true;
            myLeads=[];
            mainchk.parentElement.textContent="";
            ulEl.innerHTML="";
            edit_btn.textContent = 'Edit'
            // mainchk.parentElement.innerHTML='';
            // p_chk.innerHTML=''
            // renderLeads();

        } else{


            let demoItems = [];
            let j=0;
            for(let i=0;i<chkbx.length;i++){
             
                
               if(chkbx[i].checked){
                                    
                    // console.log(chkbx[i].parentElement.textContent);
                    chkbx[i].parentElement.innerHTML='';
                    
                    i=i-1;
                  
                    // console.log('After length' + chkbx.length); 
                    // console.log(chkbx[i].parentElement.textContent) ;
                }else{
                    demoItems[j] = chkbx[i].parentElement.textContent; 
                    j++;
                }
                               
                
            }
          
            // console.log(demoItems);
            // console.log(demoItems.length);
            myLeads=demoItems;
            console.log(myLeads.length);
            if(myLeads.length===0){
                localStorage.clear();
                edit_btn.disabled=true;
                dload.disabled = true;
                ulEl.innerHTML="";
            }else{
                localStorage.setItem('leads',JSON.stringify(myLeads));
            }
            
               
               
                for(let i=0;i<chkbx.length;i++){
                    chkbx[i].style.visibility = 'hidden';
                }
                    edit_btn.textContent='Edit';
        }
     
        }
        return false;
    })
    return false;
})
