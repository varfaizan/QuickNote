let liStr ='';
let myLeads = [];
let noteContent=[];
let noteContentIndex=0;
let dateArray = [];
let dateYearArray=[];
let fav=[];
let noteColor=[];
let flag = 0;
let editClickStatus = 0;


//to manually select note colour
// let selectedColor;
// function handleColorChange(event){
//     selectedColor = event.target.value;
//     console.log("Selected color:", selectedColor);
//     notetobeColor();

// }




// console.log("Again Selected color:", selectedColor);

document.addEventListener('DOMContentLoaded',function(){ //run js only after doc is loaded
    const bdy=document.getElementById('bdy');
    const p_chk=document.getElementById('p_chk');
    const mainchk = document.getElementById('mainchk'); 
    const edit_btn=document.getElementById('edit-btn'); 
    const ulEl = document.getElementById('ul-el');
    let chkbx = ulEl.getElementsByClassName('chk');
    const inputBtn = document.getElementById('input-btn');
    const inputEl = document.getElementById('input-el');
    const styleBtn = document.getElementById('new_style');
    const grabBtn = document.getElementById('grab-btn');
    const dload=document.getElementById('download');
    const textArea = document.getElementById('text_area');
    const contInp = document.getElementById('cont_inp');
    const showNote = document.getElementById('divshow_note');
    const containerShowNote = document.getElementById('div_li_shownote')
    const labelNotes = document.getElementsByClassName('lbl');
    const labelRecent = document.getElementById('recent_notes');
    let selectColor = document.getElementById('colorPicker');
    let fromLocal = JSON.parse(localStorage.getItem("leads")); 
    let fromLocalContent = JSON.parse(localStorage.getItem("Contentleads")); 
    let fromLocalDate = JSON.parse(localStorage.getItem("date")); 
    let fromLocalDateYear = JSON.parse(localStorage.getItem("dateYear"))
    let fromLocalColor = JSON.parse(localStorage.getItem("noteColor"))
    
    
    selectColor.addEventListener('change',function(event){
          selectedColor = event.target.value;
          console.log("Selected color:", selectedColor);
          notetobeColor();
    })
      
     function notetobeColor(){
        document.getElementById('cont_inp').style.backgroundColor=selectedColor;
        document.getElementById('text_area').style.backgroundColor=selectedColor;
        document.getElementById('input-el').style.backgroundColor=selectedColor;
            };
    
    
    showNote.style.visibility='hidden';
    dload.disabled = true;  
     
    //getting color,date,notes from local storage
    if(fromLocalColor){
        noteColor = fromLocalColor;
        inputEl.style.backgroundColor =  noteColor[0];
        textArea.style.backgroundColor =   noteColor[0]; 
        contInp.style.backgroundColor = noteColor[0];
    
    } else{
        noteColor= [];
    }


    if(fromLocalDateYear){
        dateYearArray = fromLocalDateYear;
    
    } else{
        dateYearArray = [];
    }



    if(fromLocalDate){
        dateArray = fromLocalDate;
    
    } else{
        dateArray = [];
    }


    if(fromLocalContent){
        noteContent = fromLocalContent;
    } else{
        noteContent = [];
    }

    if(fromLocal){
        dload.style.visibility='visible';
        edit_btn.style.visibility='visible';
        document.getElementById('recent_notes').style.visibility="visible"; 
        myLeads=fromLocal;
        renderLeads(); 
        ulEl.innerHTML = liStr ;                
        dload.disabled = false;
        edit_btn.disabled=false;
        }
      


    //when various buttons on LI or Notes are clicked
    containerShowNote.onclick = function(event) {
        let target = getEventTarget(event);    
        let trial = target.parentElement.textContent;   
        if(target.tagName==='BUTTON'&&target.textContent=='view'){
            //getting the precise note index by using date as unique value
            for(let i=0;i<dateArray.length;i++){
                if(trial.indexOf(dateArray[i]) !== -1){
                    noteContentIndex = i;//got the index
                }else{
           
                }
             }
        document.getElementById('cont_inp').style.visibility='hidden';
        showNote.style.backgroundColor=noteColor[noteContentIndex]; //setting note color to the note
        showNote.style.visibility='visible';
        showNote.innerHTML =  
               `<label class='shownote_time'>${dateYearArray[noteContentIndex]}</label>
                     <label class='shownote_year'>${dateArray[noteContentIndex]}</label>
                            <input type="checkbox" class="chk" ></br>
                                 <button class='note_edit'>edit</button>
                                     <button class='back'>back</button>
                                         <label class="lblContent">${noteContent[noteContentIndex]}</label>
                                                  </input> `                
                
        }else if(target.tagName==='BUTTON'&&target.textContent=='back'){
                document.getElementById('cont_inp').style.visibility='visible';
                showNote.style.visibility='hidden';
             
                
             
        }else if(target.tagName==='BUTTON'&&target.textContent=='edit'){
                target.parentElement.innerHTML=
                        `<button id="save_insideNote">Save</button> 
                            <input  type="text" id="input_note" placeholder="New Title">
                                <textarea id="text_insideNote"></textarea>`
                text_insideNote.value = noteContent[noteContentIndex];
                input_note.value = myLeads[noteContentIndex];
                text_insideNote.placeholder = 'write here';
               
               
        
        }else if(target.tagName==='BUTTON'&&target.textContent=='Save'){
                labelNotes[noteContentIndex].innerHTML = input_note.value;
                if(input_note.value==''||text_insideNote.value==''){
                    input_note.value = 'No Title';
                    text_insideNote.value = 'Nothing added yet';
                }
                
                myLeads[noteContentIndex] = input_note.value;
                localStorage.setItem('leads',JSON.stringify(myLeads));               
                noteContent[noteContentIndex]=text_insideNote.value;
                change = noteContent[noteContentIndex];
                localStorage.setItem('Contentleads',JSON.stringify(noteContent));      
                target.parentElement.innerHTML= 
                    `<label class='shownote_time'>${dateYearArray[noteContentIndex]}</label>
                         <label class='shownote_year'>${dateArray[noteContentIndex]}</label>
                             <input type="checkbox" class="chk" ></br>
                                 <button class='note_edit'>edit</button>
                                    <button class='back'>back</button>
                                        <label class="lblContent">   ${noteContent[noteContentIndex]} </label>
                                             </input> `

                 
        }    
            };

    //grab url from chrome tab
    grabBtn.addEventListener("click",function(){ 
        chrome.tabs.query({active: true,currentWindow: true},function(tabs){
            if(myLeads==null){ // otherwise myleads becomes null if fromlocal is deleted
                  myLeads=[];
                }
        let dateVal = new Date().toLocaleTimeString();
        dateArray.unshift(dateVal);
        localStorage.setItem('date',JSON.stringify(dateArray));
    
        let dateYearVal = new Date().toLocaleString('en-us',{day:'numeric',month:'short', year:'numeric'})
        dateYearArray.unshift(dateYearVal);
        localStorage.setItem('dateYear',JSON.stringify(dateYearArray));
            
        textArea.value = tabs[0].url;
        noteContent.unshift(textArea.value) ;
        localStorage.setItem('Contentleads',JSON.stringify(noteContent));
       
        myLeads.unshift(tabs[0].url);
        localStorage.setItem('leads',JSON.stringify(myLeads));
        renderLeads();
           
            
              })
        })
        
      



    //saving text box entered notes
    inputBtn.addEventListener("click",function(){
            
        if(inputEl.value == '' && textArea.value==''){

            } 
        else{
            let newColor = inputEl.style.backgroundColor;
            noteColor.unshift(newColor);
            localStorage.setItem('noteColor',JSON.stringify(noteColor));
            

            let dateVal = new Date().toLocaleTimeString();
            dateArray.unshift(dateVal);
            localStorage.setItem('date',JSON.stringify(dateArray));

            let dateYearVal = new Date().toLocaleString('en-us',{day:'numeric',month:'short', year:'numeric'})
            dateYearArray.unshift(dateYearVal);
            localStorage.setItem('dateYear',JSON.stringify(dateYearArray));
            

            if(textArea.value==''){
                textArea.value = 'NOTHING ADDED';
                noteContent.unshift(textArea.value) ;
                localStorage.setItem('Contentleads',JSON.stringify(noteContent));

            }else{
                noteContent.unshift(textArea.value) ;
                localStorage.setItem('Contentleads',JSON.stringify(noteContent));
            }
           
           
            if(inputEl.value==''){
                inputEl.value = 'Note - ' + (myLeads.length+1);
            } 

                
            if(myLeads==null){ // otherwise myleads becomes null if fromlocal is deleted
                myLeads=[];
                }
                myLeads.unshift(inputEl.value);
                localStorage.setItem('leads',JSON.stringify(myLeads));
                renderLeads();
                inputEl.value='';                                                                                           
                ulEl.innerHTML = liStr;                   
                return false;
            }
            })
    
        //changing color of background
    styleBtn.addEventListener("click",function(){
        let randomColor = getRandomColor();
        contInp.style.backgroundColor=randomColor
        textArea.style.backgroundColor=randomColor
        inputEl.style.backgroundColor=randomColor          
        localStorage.setItem('color',randomColor);//save color to local storage to access next time
        })

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
                   }
        return color;
                    }
  
      //edit and delete button
    edit_btn.addEventListener('click',function(){
        if(editClickStatus===0){
            labelRecent.style.visibility='hidden';
            edit_btn.style.backgroundImage='url(delete.png)'
            editClickStatus = 1 // as it will change to delete functionality
            inputBtn.disabled=true;
            grabBtn.disabled=true;
            dload.disabled=true;
            edit_btn.style.color ='darkred';
            p_chk.style.visibility='visible';
            mainchk.style.visibility = 'visible';
           
            for(let i=0;i<chkbx.length;i++){
                chkbx[i].style.visibility = 'visible';
            }
               } 
        else {
            labelRecent.style.visibility='visible';
            edit_btn.style.backgroundImage='url(edit.png)'
            editClickStatus=0
            edit_btn.style.color ='whitesmoke';
            inputBtn.disabled=false;
            grabBtn.disabled=false;
            p_chk.style.visibility='hidden';
            mainchk.style.visibility = 'hidden';
            if(mainchk.checked){//meaning all items will be deleted
                //everything is basically set to default
                localStorage.clear();
                localStorage.setItem('color',bdy.style.background)
                edit_btn.disabled=true;
                myLeads=[];
                dateArray=[];
                dateYearArray=[];
                noteContent=[];
                noteContentIndex=0;
                mainchk.parentElement.textContent="";
                edit_btn.textContent = 'Edit'
                p_chk.innerHTML=''
                ulEl.innerHTML="";
        
            } else{ //meaning only selected items are to be deleted 
                //saving a copy of current arrays we have, as original will be modified to contain selected items only
                myLeadsCopy = myLeads;
                noteContentCopy = noteContent;
                dateArrayCopy =  dateArray;
                dateYearArrayCopy = dateYearArray;
                noteColorCopy = noteColor;
                let demoNotes = [];
                let demoItems = [];
                let demoDate=[];
                let demoDateYear=[];
                let demoColor = []
                let j=0;
                let k=0;
                     
                        //to delete selected individual checked items
                         for(let i=0;i<chkbx.length;i++){
                              if(chkbx[i].checked){
                                 chkbx[i].parentElement.innerHTML='';
                                 i=i-1;
                                 
                                 
                              }else{
                                    demoColor[j] = noteColorCopy[k];
                                    demoItems[j] = myLeadsCopy[k];
                                    demoNotes[j] = noteContentCopy[k];
                                    demoDate[j] = dateArrayCopy[k];
                                    demoDateYear[j] = dateYearArrayCopy[k];
                                 j++;
                                    }
                        k++; 
                                         }  
                        noteColor = demoColor;                 
                        dateArray = demoDate;
                        dateYearArray = demoDateYear;                 
                        noteContent = demoNotes;
                        myLeads=demoItems; //only remaining li items in myLeads 
                              
                         
                        if(myLeads.length===0){
                            localStorage.clear();
                            localStorage.setItem('color',bdy.style.background)
                            edit_btn.disabled=true;
                            dload.disabled = true;
                            ulEl.innerHTML="";
                        }else{
                            localStorage.clear();
                            localStorage.setItem('color',bdy.style.background);
                            
                            localStorage.setItem('leads', JSON.stringify(myLeads));
                            myLeads = JSON.parse(localStorage.getItem("leads"));

                            localStorage.setItem('Contentleads',JSON.stringify(noteContent));
                            noteContent = JSON.parse(localStorage.getItem("Contentleads"));

                            localStorage.setItem('date',JSON.stringify(dateArray));
                            dateArray = JSON.parse(localStorage.getItem("date"));
                           
                            localStorage.setItem('dateYear',JSON.stringify(dateYearArray));
                            dateYearArray = JSON.parse(localStorage.getItem("dateYear"));

                            localStorage.setItem('noteColor',JSON.stringify(noteColor));
                            noteColor = JSON.parse(localStorage.getItem("noteColor"));

                            
                            ulEl.innerHTML="";
                            liStr = '';
                            renderLeads();
                            ulEl.innerHTML = liStr ;
                              }
            
                        for(let i=0;i<chkbx.length;i++){
                            chkbx[i].style.visibility = 'hidden';
                         }
                      
                             }
     
                                  }
                    localStorage.setItem('color',bdy.style.background)
                    return false;
       
    })



       
    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement; 
        }
        


    //getting the note HTML with note content 
    function renderLeads(){
        for(let i=0;i<myLeads.length;i++){
                
            let demolead = JSON.stringify(myLeads[i]);
                let lnkInd = demolead.indexOf('.');
                // checking whether . is present to verify its link
                    if(lnkInd===-1){
                        liStr += 
                        ` <li class="li_notes" style="background-color: ${noteColor[i]}"> 
                              <label  class="date_label">${dateArray[i]}</label>
                                  <button class="view_btn" title="view full note content">view</button>
                                      <label class="lbl">${myLeads[i]}</label>    
                                         <input type="checkbox" class="chk" ></br>
                                         
                                             </input> 
                                                   </li>` 
           




                    }else{
                        liStr += 
                        `<li class="li_notes" "background-color: ${noteColor[i]}"> 
                            <label class="date_label">${dateArray[i]}</label> 
                            <button class="view_btn" title="view full note content">view</button>
                                <input type="checkbox" class="chk" ></input>
                                 <label class="linklbl">
                                     <a id="grabbed_url" target="_blank" href="${myLeads[i]}">${myLeads[i]}</a>
                                        </label>
                                             </li>`
    
                          }
     
                               }

                                    }
    //selecting and unselecting checkboxes                                
    document.querySelectorAll('.chk').forEach( button => {
        button.onclick = function () {
            if(this.id == 'mainchk'){
                if (mainchk.checked==true){
                    for(let i=0;i<chkbx.length;i++){
                        chkbx[i].checked = true;
                   }
           
                
                }else if(mainchk.checked==false){
                    for(let i=0;i<chkbx.length;i++){
                        chkbx[i].checked = false;
               
                    }
                        }
           }else {
                let count = 0;
                    for(let i=0;i<chkbx.length;i++){
                        if(chkbx[i].checked == true){
                    
                                    }
                        else{
                          count =1;
                    }
                           }
                                                             
                if(count===1){
                    mainchk.checked = false;
                }else{
                    mainchk.checked = true;
                            }

              }
       
                        }
                                });
                                                         

        //saving offline on clicking download
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


        // Download button event click
        let text= ulEl.textContent;
        el("#download").addEventListener("click", () => {
        createAndDownload(text, "text/plain");
              });

     return false;
})

