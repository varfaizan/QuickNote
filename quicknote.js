let liStr ='';
var myLeads = []
var i=0;

document.addEventListener('DOMContentLoaded',function(){
 
    const ulEl = document.getElementById('ul-el');
    const inputBtn = document.getElementById('input-btn');
    const inputEl = document.getElementById('input-el');
    const delBtn = document.getElementById('delete-btn');
    const grabBtn = document.getElementById('grab-btn');

    let fromLocal = JSON.parse(localStorage.getItem("leads"));
     if(fromLocal){
        myLeads=fromLocal;      
        renderLeads();
        ulEl.innerHTML = liStr ;
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
        ulEl.innerHTML="";
        localStorage.clear();
        myLeads=[];
        i=0;
        liStr ='';
    })


  
function renderLeads(){
  
                 
    for(i;i<myLeads.length;i++){
    liStr += 
    `<li> 
    <a 
    target="_blank" href="${myLeads[i]}">${myLeads[i]} 
    </a>
    </li>`   
    ; 
    
     }
     
return false;
}

})