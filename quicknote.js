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
let searchFlag = 0;
let newNoteFlag =0;
let CategoryList=[]
let Favourites=  {
    name:'Favourites', 
    content:[],
    value:'', 
    color:[],
    time:[],
    date:[]

};
let Important=  {
    name:'Important', 
    content:[],
    value:'', 
    color:[],
    time:[],
    date:[]

};
let Personal=  {
    name:'Personal', 
    content:[],
    value:'', 
    color:[],
    time:[],
    date:[]

};;
let checkCategory = 0;
let dropBtnStatus=0;
let statusCategory=[0,0,0];

//to manually select note colour



document.addEventListener('DOMContentLoaded',function(){ //run js only after doc is loaded
    const bdy=document.getElementById('bdy');
    const p_chk=document.getElementById('p_chk');
    const mainchk = document.getElementById('mainchk'); 
    const edit_btn=document.getElementById('edit-btn'); 
    const ulEl = document.getElementById('ul-el');
    let chkbx = ulEl.getElementsByClassName('chk');
    let backBtns = document.getElementsByClassName('done_btn') 
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
    const ulCategory = document.getElementById('ul_category');
    const countText = document.getElementById('count_text');
    const countTextArea = document.getElementById('count_textarea');
    const editBack = document.getElementById('edit_back');
    const searchBtn = document.getElementById('search_btn');
    const textSearch = document.getElementById('search_notes');
    const dropBtn = document.getElementById('drop_btn');
    const refreshBtn = document.getElementById('refresh_btn');
    const fontColorBtn = document.getElementById('fontcolor_btn');
    const aboutBtn = document.getElementById('about_btn');
    const backCategory = document.getElementById('back_category');

    let editSelectColor = document.getElementById("colorPicker_edit");
    let selectColor = document.getElementById('colorPicker');
    let fromLocal = JSON.parse(localStorage.getItem("leads")); 
    let fromLocalContent = JSON.parse(localStorage.getItem("Contentleads")); 
    let fromLocalDate = JSON.parse(localStorage.getItem("date")); 
    let fromLocalDateYear = JSON.parse(localStorage.getItem("dateYear"))
    let fromLocalColor = JSON.parse(localStorage.getItem("noteColor"))
   
   
    document.getElementById('home_btn').disabled = true;

    document.getElementById("refresh_btn").addEventListener('click',function(){
        localStorage.clear();
        ulEl.innerHTML="";
        liStr="";
        // ulEl.style.visibility='hidden';
        // edit_btn.style.visibility='hidden';
    })


    document.getElementById("about_btn").addEventListener('click',function(){
        
        document.getElementById('cont_all').innerHTML="I am Faizan Nabi";
      
    })
 



        statusLabel();
        function statusLabel(actionwords){

            let today = new Date()
            let curHr = today.getHours()

            if (curHr < 12) {
                document.getElementById('cont_greet').textContent="";
                let letters = 'Good Morning';
                let i=0;
                let stop = setInterval(() => {
                document.getElementById('cont_greet').textContent+=letters.charAt(i);
                i++;
                if(i>letters.length){
                    clearInterval(stop);
                     }
                    
                },150)
            } else if (curHr < 18) {
                document.getElementById('cont_greet').textContent="";
                let letters = 'Good Afternoon';
                let i=0;
                let stop = setInterval(() => {
                document.getElementById('cont_greet').textContent+=letters.charAt(i);
                i++;
                if(i>letters.length){
                    clearInterval(stop);
                     }
                    
                },150) 
    
        
            } else {
                document.getElementById('cont_greet').textContent="";
                let letters = 'Good Evening';
                let i=0;
                let stop = setInterval(() => {
                document.getElementById('cont_greet').textContent+=letters.charAt(i);
                i++;
                if(i>letters.length){
                    clearInterval(stop);
                     }
                    
                },150)
                }

          

           
           
    }
 
                     

    ulCategory.onclick=function(event){
        let target = getEventTarget(event); 
        let text_category='' ;
        if(target.tagName=='LI'&&target.tagName!=='BUTTON'&&target.tagName!=='LABEL'){
             for(let i=0;i<target.children.length;i++){
            if(target.children[i].className=='category_name'){
          
            text_category=target.children[i].innerText;
         
        }
       }
    }

    if(target.tagName=='IMG'||target.tagName=='LABEL'){
        let newTarget = target.parentElement;
        for(let i=0;i<newTarget.children.length;i++){
        if(newTarget.children[i].className=='category_name'){
      
        text_category=newTarget.children[i].innerText;
     
    }
   }
}


      
        let ContentInCategory = JSON.parse(localStorage.getItem(text_category));
        let objectCategory = Categorize(ContentInCategory,target.textContent,0)
        if (ContentInCategory){
          
            // edit_btn.style.visibility='hidden';
            backCategory.style.visibility='visible';
            ulEl.innerHTML="";
            liStr="";
            renderLeads(objectCategory.value,objectCategory.content,objectCategory.color,objectCategory.time,objectCategory.date);
            ulEl.innerHTML=liStr;
            if(text_category == 'Favourites'){
                document.getElementById('show_category').innerHTML=`${text_category} <img id="img_currentcategory" src="love.png">`;
                for(let i =0;i<objectCategory.date.length;i++){
                
                    changeBackgroundImage(document.getElementsByClassName('tag_btnsfav')[i],noteContentIndex,Favourites,'fav',1);
                    
                }
          
            }else  if(text_category == 'Important'){
                document.getElementById('show_category').innerHTML=`${text_category} <img id="img_currentcategory" src="important.png">`;
                for(let i =0;i<objectCategory.date.length;i++){
                
                    changeBackgroundImage(document.getElementsByClassName('tag_btnsimp')[i],noteContentIndex,Important,'imp',1);
                }
            } else  if(text_category == 'Personal'){
                document.getElementById('show_category').innerHTML=`${text_category} <img id="img_currentcategory" src="per.png">`;
                for(let i =0;i<objectCategory.date.length;i++){
                
                    changeBackgroundImage(document.getElementsByClassName('tag_btnspersonal')[i],noteContentIndex,Personal,'personal',1);
                }
            }
           
        }else {
            
        }

       




        backCategory.style.visibility='visible';
     
        clickLI();
    }


  
  let CategoryList = JSON.parse(localStorage.getItem('CategoryList'));
  if(!CategoryList){
    CategoryList=['Favourites','Important','Personal'];
    localStorage.setItem("CategoryList",JSON.stringify(CategoryList))
   } 

  
  
  
  for(let i=0;i<CategoryList.length;i++){
    ulCategory.innerHTML+=`<li class="list_category"  title="Notes added to ${CategoryList[i]} will appear here">
                            <label class = "noteCategory_count">0 notes</label> 
                                <img class="img_category"src=forward.png >
                                    <label class="category_name">
                                        ${CategoryList[i]} </label> </li>`
} 

note_count();
function note_count(){
    
let noteCategoryCount = document.getElementsByClassName('noteCategory_count')

for(let i=0;i<CategoryList.length;i++){
   let localCategory = []
   localCategory[i]= JSON.parse(localStorage.getItem(CategoryList[i]));
   
  if(localCategory[i]){
    noteCategoryCount[i].textContent = `${localCategory[i].time.length} notes`; 
  }
{/* <label class = "noteCategory_count">Count</label> <img class="img_category"src=forward.png ></img> */}
}
}




const listItems = document.getElementsByClassName("list_category");

   
    listItems[0].style.backgroundColor='#49b8a9';
    listItems[1].style.backgroundColor='#e1a454';
    listItems[2].style.backgroundColor='#49b8a9';
    

    document.getElementById('newnote_btn').onclick=function(){

        
        if(document.getElementById('time_insidenote')){
        document.getElementById('time_insidenote').style.visibility='hidden';  }
        document.getElementById('show_category').style.visibility='hidden';
        showNote.style.visibility='hidden';
        ulCategory.style.visibility='hidden';
        edit_btn.style.visibility='hidden';
       if(newNoteFlag===0){

        for(let i=0;i<chkbx.length;i++){
            backBtns[i].style.visibility='hidden';
            
        }
            this.title = 'back';
            this.style.backgroundImage=`url('previous.png')`;
            this.style.marginTop = '5px';
            this.style.marginLeft = '80px';
            this.style.width = '30px';
            this.style.height = '30px';
            this.style.border = 'none';
            dload.style.visibility ='hidden';
            selectColor.style.visibility='visible';
            ulEl.style.visibility='hidden';
            inputBtn.style.visibility = 'visible';
            // textSearch.style.visibility='hidden';
            // searchBtn.style.visibility='hidden';
            contInp.style.visibility='visible';
            document.getElementById('top_note').style.visibility='visible';
            // countText.style.visibility='visible';
            newNoteFlag=1
       
       }else{

        for(let i=0;i<chkbx.length;i++){
            backBtns[i].style.visibility='visible';
            
        }

               document.getElementById('show_category').style.visibility='visible';
              textSearch.style.visibility='visible';
            //   searchBtn.style.visibility='visible';
              ulCategory.style.visibility='visible';
            ulEl.style.visibility='visible';
            contInp.style.visibility='hidden';
            document.getElementById('top_note').style.visibility='hidden';
            newNoteFlag=0;
            this.title = 'Create New note';
            this.style.backgroundImage=`url('newnote.png')`;
            this.style.marginTop = '-20px';
            this.style.marginLeft = '130px';
            this.style.width = '60px';
            this.style.height = '60px';
            selectColor.style.visibility='hidden';
            dload.style.visibility ='visible';
            inputBtn.style.visibility='hidden';
            edit_btn.style.visibility='visible'
       }
       
     
    }
  
  document.getElementById('home_btn').onclick=function(){
    editClickStatus=0;
    edit_btn.style.backgroundImage='url(edit1.png)'
    for(let i=0;i<chkbx.length;i++){
        backBtns[i].style.visibility='visible';
       
    }
    ulCategory.style.visibility='visible';
    ulEl.style.visibility='visible';
    dload.style.visibility='visible';
    edit_btn.style.visibility='visible';
    selectColor.style.visibility='hidden';
    document.getElementById('show_category').style.visibility='visible';
    contInp.style.visibility='hidden';
    document.getElementById('top_note').style.visibility='hidden';
    showNote.style.visibility='hidden';
    // document.getElementById('time_insidenote').style.visibility='hidden';
    document.getElementById('input-btn').style.visibility='hidden';
    document.getElementById('newnote_btn').style.backgroundImage=`url('newnote.png')`;
    document.getElementById('newnote_btn').style.marginTop = '-20px';
    document.getElementById('newnote_btn').style.marginLeft = '130px';
    document.getElementById('newnote_btn').style.width = '60px';
    document.getElementById('newnote_btn').style.height = '60px';
    document.getElementById('newnote_btn').style.visibility = 'visible';
    inputBtn.style.visibility="hidden";
  }
    dropBtn.onclick=function(){
       
        if(dropBtnStatus==0){
            refreshBtn.style.visibility = 'visible';
            aboutBtn.style.visibility = 'visible';
             dropBtnStatus=1;
        }else  if(dropBtnStatus==1){
             refreshBtn.style.visibility = 'hidden';
             aboutBtn.style.visibility = 'hidden';
             dropBtnStatus=0;
        }
      
    }
 
    countText.innerText = `${new Date().toLocaleString('en-us',{day:'numeric',month:'short', year:'numeric'})}         |     0/20 words`;
    
    inputEl.onkeyup=function(){
        countText.innerText = `${new Date().toLocaleString('en-us',{day:'numeric',month:'short', year:'numeric'})}         |   ${inputEl.value.length}/20 words`;
    }

    textArea.onkeyup=function(){
        let  lines = textArea.value.split(/\r?\n/);
            if(lines.length >= 11){
            
                textArea.style.zIndex='2';
                 
                textArea.style.opacity='0.8';
            }else if(lines.length < 11){
                textArea.style.zIndex='0';
               
                textArea.style.opacity='0.7';
            }
           

       if(textArea.value==""){
            styleBtn.style.visibility='hidden';
            countTextArea.style.visibility='hidden';
        }else
            styleBtn.style.visibility='visible';
            countTextArea.style.visibility='visible';
            countTextArea.innerText = textArea.value.length;
            if(textArea.value.length==0){
                countTextArea.style.visibility='hidden';
            }
    }

    selectColor.addEventListener('change',function(event){
     
         let selectedColor = event.target.value;
          console.log(selectedColor);
          notetobeColor(selectedColor);
    })
      
     function notetobeColor(selectedColor){
             document.getElementById('text_area').style.backgroundColor=selectedColor
      

            };
    
    

            editSelectColor.addEventListener('change',function(event){
     
                let editSelectedColor = event.target.value;
                 console.log(editSelectedColor);
                 notetobeColorEdit(editSelectedColor);
           })
             
            function notetobeColorEdit(editSelectedColor){
              
                    document.getElementById('text_insideNote').style.backgroundColor=editSelectedColor
              }
       
                   



    showNote.style.visibility='hidden';
    dload.disabled = true;  
     
    //getting color,date,notes from local storage
    if(fromLocalColor){
        noteColor = fromLocalColor;
        // inputEl.style.backgroundColor =  noteColor[0];
        textArea.style.backgroundColor =   noteColor[0]; 
        // contInp.style.backgroundColor = noteColor[0];
    
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
        document.getElementById('home_btn').disabled = false;
        myLeads=fromLocal;
        renderLeads(myLeads,noteContent,noteColor,dateArray,dateYearArray); 
        ulEl.innerHTML = liStr ;                
        dload.disabled = false;
        edit_btn.disabled=false;
        }else{
            document.getElementById('show_category').innerHTML=`Start Adding Notes <img id="img_currentcategory" src="addnewnote.png">`;
        
        }
      clickLI();
     
      if(myLeads.length){
        textSearch.disabled = false;

      }



      
      backCategory.onclick=function (){
       if(ulEl.innerHTML == ""){
        document.getElementById('show_category').innerHTML=`Start Adding Notes <img id="img_currentcategory" src="addnewnote.png">`;
        
       }else{
        document.getElementById('show_category').innerHTML=`Recent <img id="img_currentcategory" src="recent.png">`;
       
       }
            
        liStr='';
        renderLeads(myLeads,noteContent,noteColor,dateArray,dateYearArray); 
        ulEl.innerHTML = liStr ;  
        edit_btn.style.visibility='visible';
        backCategory.style.visibility='hidden';
    }





      categoryBtnImageOnLoad(['Favourites','Important','Personal'],['fav','imp','personal']);

      function categoryBtnImageOnLoad(categoryList,imageName){
     
        let categoryListCopy = categoryList;
        let imageNameCopy = imageName;
        let fromLocalLeads = JSON.parse(localStorage.getItem('leads'))
        let fromLocalCategory=[];
        let tagBtns = [document.getElementsByClassName('tag_btnsfav'),document.getElementsByClassName('tag_btnsimp'),document.getElementsByClassName('tag_btnspersonal')]
                            
       
        for(let i=0;i<categoryListCopy.length;i++){
            
            fromLocalCategory[i] = JSON.parse(localStorage.getItem(categoryListCopy[i]))
                if(fromLocalCategory[i]){ 
                for(let j=0;j<fromLocalCategory[i].value.length;j++){
                       for(let k=0;k<fromLocalLeads.length;k++){
                          if(fromLocalCategory[i].value[j]== fromLocalLeads[k]) {
                          
                                     tagBtns[i][k].style.backgroundImage=`url(${imageNameCopy[i]}hover.png)`;
                                             
                                
                }
                
            }
                
        }
            }
                 }



      }



    function changeBackgroundImage(target,noteContentIndex,obj,imageName,source){
        
        let flagCategory=0;
        let sourceCopy=source;
     
        let targetCopy = target;
        let noteContentIndexCopy = noteContentIndex;
        let valueCopy;
        if(obj==null){}
        else{
            valueCopy = obj.value;
        }
        
        let imageNameCopy = imageName;
        if(valueCopy.length>0){
            for(let i=0;i<valueCopy.length;i++){

               
                    if(valueCopy[i] == myLeads[noteContentIndexCopy]){
                        targetCopy.style.backgroundImage=`url(${imageNameCopy}.png)`;
                        flagCategory = 1;
                    }else if(flagCategory==0){
                        targetCopy.style.backgroundImage=`url(${imageNameCopy}hover.png)`;
                       
                    }
               
                    if(valueCopy[i] == myLeads[noteContentIndexCopy]){
                        targetCopy.style.backgroundImage=`url(${imageNameCopy}hover.png)`;
                    
                    }else if(flagCategory==0){
                        targetCopy.style.backgroundImage=`url(${imageNameCopy}.png)`;
                       
                    }
              
             
            } 
        }else{
            targetCopy.style.backgroundImage=`url(${imageNameCopy}hover.png)`;
        }
        
       
        }
   
     














     function Categorize(Category,source){
        let sourceCopy = source;
        let objCategory = Category;
      
      if(objCategory!=null)  {
      if(objCategory.value){}
      else{
        objCategory.value=[]
      }
      let flag=0;  
    //   let CategoryLocal = JSON.parse(localStorage.getItem(objCategory.name));
     
     
        for(let i=0;i<objCategory.value.length;i++){
    
            if(objCategory.value[i]===myLeads[noteContentIndex]&&sourceCopy==1){
                flag=1;
                delete objCategory.value.splice(i,1);
                delete objCategory.content.splice(i,1);
                delete objCategory.color.splice(i,1);
                delete objCategory.time.splice(i,1);
                delete objCategory.date.splice(i,1);
    
            }
          }
     
      
        if(flag==0&&sourceCopy==1){
            objCategory.value.unshift(myLeads[noteContentIndex]);
            objCategory.content.unshift(noteContent[noteContentIndex]);
            objCategory.color.unshift(noteColor[noteContentIndex]);
            objCategory.time.unshift(dateArray[noteContentIndex]);
            objCategory.date.unshift(dateYearArray[noteContentIndex]);
        } 
       
            localStorage.setItem(objCategory.name,JSON.stringify(objCategory));
       
        
      
        ulCategory.style.visibility='visible';
        if(objCategory.value.length==0){
            localStorage.removeItem(objCategory);

        } 
       return objCategory;
    }else{
        ulEl.innerHTML="";
        document.getElementById('show_category').innerHTML=`Nothing added <img id="img_currentcategory" src="nothing.png">`; 
  
    //  ulEl.innerHTML=`Please add something first`;
    }
     }
        
     
      function clickLI(source){
      
        function viewNote(event){
            editSelectColor.style.visibility="visible";
            for(let i=0;i<chkbx.length;i++){
                backBtns[i].style.visibility='hidden';
                
            }
       
            editClickStatus=0;
            edit_btn.style.backgroundImage='edit1';
            if(source=='delete'){
                console.log('delete is source');
                editBack.style.visibility="hidden";
                for(let i=0;i<chkbx.length;i++){
                    backBtns[i].style.visibility='hidden';
                    chkbx[i].style.visibility = 'hidden';
                    mainchk.style.visibility='hidden';
                }
            }


            let target = getEventTarget(event); 
            let chkBoxStatus = 0;
               for(let i=0;i<chkbx.length;i++){ 
               if (chkbx[i]==target){
                chkBoxStatus=1;
               }}

               if(chkBoxStatus==0){
                ulCategory.style.visibility='hidden';
                document.getElementById('newnote_btn').style.marginTop='5px';
                document.getElementById('newnote_btn').style.marginLeft='215px';
                document.getElementById('newnote_btn').style.width='30px';
                document.getElementById('newnote_btn').style.height='30px';
                document.getElementById('newnote_btn').style.border='none';
                document.getElementById('newnote_btn').style.backgroundImage=`url('newnote2.png')`;
             
                // edit_btn.style.visibility='hidden';
                ulEl.style.visibility='hidden';
                // textSearch.style.visibility='hidden';
                // searchBtn.style.visibility='hidden';
                
        
                let trial = target.parentElement.textContent;    

               if(searchFlag===0){
    
               }else{
               
                searchFlag=0;
               } 
                    if (target.className == 'li_notes'){
                        trial = target.textContent; 
                    }else{
                        trial = target.parentElement.textContent;
                    }
                     
                  //getting the precise note index by using date as unique value
                    for(let i=0;i<dateArray.length;i++){
                        if(trial.indexOf(dateArray[i]) !== -1){
                            noteContentIndex = i;//got the index
                        }else{
                            //do nothing
                            }
                         }
                    document.getElementById('cont_inp').style.visibility='hidden';
                    document.getElementById('top_note').style.visibility='hidden';
                    edit_btn.style.visibility='hidden';
                    dload.style.visibility='hidden';  
                    // document.getElementById('show_category').style.visibility='hidden';
       
                    showNote.style.visibility='visible';
                    showNote.innerHTML =  
                         `<div id="view_title">
                           
                                <input type="text" id="input_note" maxlength="15" placeholder="New Title"></div>
                                <label  class="date_label" id="time_insidenote">${dateArray[noteContentIndex]}</label>
                                                    <label class="dateyear_label" id="date_insidenote">${dateYearArray[noteContentIndex]}</label>
                                                
                                  <textarea id="text_insideNote" ></textarea>
                                  <button id="save_insideNote" title="save changes"></button> 
                                  <button id="back_insideNote" title="back"></button> </div>`
                    text_insideNote.value = noteContent[noteContentIndex];
                    input_note.value = myLeads[noteContentIndex];
                    text_insideNote.placeholder = 'Add here';
                    document.getElementById('text_insideNote').style.backgroundColor=noteColor[noteContentIndex]; //setting note color to the note
                        
                
                    }
                }
                
              
            
              for(i=0;i<=ulEl.childElementCount-1;i++){
                ulEl.children[i].addEventListener("click",viewNote);
               }
           
           
            
    
     }

   



    //when various buttons on LI or Notes are clicked
    containerShowNote.onclick = function(event) {
        let target = getEventTarget(event);  
        let trial;
        let demotarget = target.parentElement.parentElement
         
        for(let i = 0;i<demotarget.children.length;i++){
            if(demotarget.children[i].className=='date_label'){
                trial = demotarget.children[i].textContent;
            }


        }
       

     
        if(target.tagName==='BUTTON'&&target.className=='done_btn'){
           
            //getting the precise note index by using date as unique value
            for(let i=0;i<dateArray.length;i++){
                if(trial.indexOf(dateArray[i]) !== -1){
                    noteContentIndex = i;//got the index
                }else{
           
                }
             }

 
        let tempLeads = [];
        let tempnoteContent = [];
        let tempdateArray=[];
        let tempdateYearArray=[];
        let tempnoteColor=[];
        let k=0,flag=0;
        for(let i=0;i<myLeads.length;i++)   {
            if (i===noteContentIndex && flag===0){
                //skipping
                i=i-1;
                k=k+1;
                flag=1;
            }else{
                tempLeads[i] = myLeads[k];
                tempnoteContent[i] = noteContent[k];
                tempdateArray[i]= dateArray[k];
                tempdateYearArray[i]= dateYearArray[k];
                tempnoteColor[i]= noteColor[k];
                k++;
            }
        } 
        tempLeads.pop();
        tempnoteContent.pop();
        tempdateArray.pop();
        tempdateYearArray.pop();
        tempnoteColor.pop(); 
       
        myLeads = tempLeads;

       noteColor = tempnoteContent;
       dateArray = tempdateArray;
       dateYearArray =  tempdateYearArray;
       noteColor =  tempnoteColor;
        noteContent = tempnoteContent;

    //    document.getElementById('cont_inp').style.visibility='visible';
       showNote.style.visibility='hidden';
    //    document.getElementById('top_note').style.visibility='visible'; 
        ulEl.style.visibility='visible';
        dload.style.visibility='visible';
        edit_btn.style.visibility='visible';
        document.getElementById('newnote_btn').style.marginTop='-20px';
        document.getElementById('newnote_btn').style.marginLeft='130px';
        document.getElementById('newnote_btn').style.width='60px';
        document.getElementById('newnote_btn').style.height='60px';
        document.getElementById('newnote_btn').style.border='2px solid white';
        document.getElementById('newnote_btn').style.backgroundImage=`url('newnote.png')`;

  if(myLeads.length===0){
        localStorage.clear();
        edit_btn.disabled=true;
        edit_btn.style.visibility='hidden';
        dload.disabled = true;
        // dload.style.visibility='hidden';
        ulEl.innerHTML="";
        // labelRecent.style.visibility='hidden';
        clickLI();
        ulCategory.style.visibility='visible';
        document.getElementById('time_insidenote').style.visibility='hidden';
        document.getElementById('show_category').innerHTML=`Start Adding Notes <img id="img_currentcategory" src="addnewnote.png">`;
       dload.style.visibility='visible';
       edit_btn.style.visibility='visible';
       document.getElementById('newnote_btn').style.marginTop='-20px';
       document.getElementById('newnote_btn').style.marginLeft='130px';
       document.getElementById('newnote_btn').style.width='60px';
       document.getElementById('newnote_btn').style.height='60px';
       document.getElementById('newnote_btn').style.border='2px solid white';
       document.getElementById('newnote_btn').style.backgroundImage=`url('newnote.png')`;
    

    }else{


        localStorage.clear();
       
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
        renderLeads(myLeads,noteContent,noteColor,dateArray,dateYearArray);
        ulEl.innerHTML = liStr ;

        clickLI();
        ulCategory.style.visibility='visible';
        document.getElementById('time_insidenote').style.visibility='hidden';
            

    }
               
        
        }else if(target.tagName==='BUTTON'&&target.id=='save_insideNote'){
              document.getElementById('time_insidenote').style.visibility='hidden';
              document.getElementById('show_category').style.visibility='visible';
              let dateValue = dateArray[noteContentIndex];
                let tempCategory = [];
                let tempCategoryList =  JSON.parse(localStorage.getItem('CategoryList'));
                
                for(let i=0;i<tempCategoryList.length;i++){
                   tempCategory[i] = JSON.parse(localStorage.getItem(tempCategoryList[i]));
                } 
            
               
                for(let i=0;i<tempCategory.length;i++){
                    
                    for(let j=0;j<tempCategory.length;j++){
                       if(tempCategory[i]){
                        if(tempCategory[i].time[j]==dateValue){
                           
                            tempCategory[i].value[j] = input_note.value;
                            tempCategory[i].content[j] = text_insideNote.value;
                           
                        }
                       } 
                     
                    }
                }
                
                for(let i=0;i<tempCategoryList.length;i++){
                    localStorage.setItem(tempCategoryList[i],JSON.stringify(tempCategory[i]));   
                 }   

            
                if(input_note.value==''||text_insideNote.value==''){
                    input_note.value = 'No Title';
                    text_insideNote.value = 'Nothing added yet';
                }
             
                myLeads[noteContentIndex] = input_note.value;
                localStorage.setItem('leads',JSON.stringify(myLeads));               
                noteContent[noteContentIndex]=text_insideNote.value;
                localStorage.setItem('Contentleads',JSON.stringify(noteContent));  
                noteColor[noteContentIndex] = text_insideNote.style.backgroundColor;
                localStorage.setItem('noteColor',JSON.stringify(noteColor));  
              
                // console.log(text_insideNote.style.backgroundColor,"is bg color")
                textArea.style.visibility="hidden";
                contInp.style.visibility="hidden";
                showNote.style.visibility='hidden';
                labelNotes[noteContentIndex].textContent = text_insideNote.value;
                let titleLabel=document.getElementsByClassName('title_label');
                titleLabel[noteContentIndex].textContent = input_note.value;
                document.getElementsByClassName('li_notes')[noteContentIndex].style.backgroundColor =  noteColor[noteContentIndex];
                ulEl.style.visibility='visible'  
                ulCategory.style.visibility='visible';  
                dload.style.visibility='visible';   
                edit_btn.style.visibility='visible';
                editSelectColor.style.visibility="hidden";
                document.getElementById('newnote_btn').style.marginTop='-20px';
                document.getElementById('newnote_btn').style.marginLeft='130px';
                document.getElementById('newnote_btn').style.width='60px';
                document.getElementById('newnote_btn').style.height='60px';
                document.getElementById('newnote_btn').style.border='2px solid white';
                document.getElementById('newnote_btn').style.backgroundImage=`url('newnote.png')`;
                editClickStatus=0;
                edit_btn.style.backgroundImage='url(edit1.png)'
                for(let i=0;i<chkbx.length;i++){
                    backBtns[i].style.visibility='visible';
                }





        }  else if(target.tagName==='BUTTON'&&target.id=='back_insideNote'){
            // document.getElementById('cont_inp').style.visibility='visible';
            editClickStatus=0;
            edit_btn.style.backgroundImage='url(edit1.png)'
            for(let i=0;i<chkbx.length;i++){
                backBtns[i].style.visibility='visible';
            }
            document.getElementById('time_insidenote').style.visibility='hidden';
            document.getElementById('show_category').style.visibility='visible';
            edit_btn.style.visibility='visible';
            dload.style.visibility='visible';       
            showNote.style.visibility='hidden';
            ulEl.style.visibility='visible'
            textSearch.style.visibility='visible';
            // searchBtn.style.visibility='visible';
            ulCategory.style.visibility='visible';
            editSelectColor.style.visibility="hidden";
                document.getElementById('newnote_btn').style.marginTop='-20px';
                document.getElementById('newnote_btn').style.marginLeft='130px';
                document.getElementById('newnote_btn').style.width='60px';
                document.getElementById('newnote_btn').style.height='60px';
                document.getElementById('newnote_btn').style.border='2px solid white';
                document.getElementById('newnote_btn').style.backgroundImage=`url('newnote.png')`;
             
            // document.getElementById('top_note').style.visibility='visible'; 
        }  else if(target.tagName==='BUTTON'&&target.className=='download_note'){
                
                text=noteContent[noteContentIndex];
                     //saving offline on clicking download
                createAndDownload(text, "text/plain");
                showNote.style.visibility='hidden';
                ulEl.style.visibility='visible'; 
                ulCategory.style.visibility='visible' ;
                edit_btn.style.visibility='visible';
                document.getElementById('time_insidenote').style.visibility='hidden';
            
                
         } else if(target.tagName==='BUTTON'&&target.id=='fav_btn'){
                
              
                let fromLocalFavourites  = JSON.parse(localStorage.getItem('Favourites'));
                if(fromLocalFavourites){
                    Favourites = fromLocalFavourites;
                }else{
                    Favourites =  {
                        name:'Favourites', 
                        content:[],
                        value:'', 
                        color:[],
                        time:[],
                        date:[]
                    
                    };
                }
                changeBackgroundImage(target,noteContentIndex,Favourites,'fav');
            
                Categorize(Favourites,1);
                note_count();
                document.getElementById('time_insidenote').style.visibility='hidden';
            
                showNote.style.visibility='hidden';
                ulEl.style.visibility='visible';
                document.getElementById('newnote_btn').style.marginTop='-20px';
                document.getElementById('newnote_btn').style.marginLeft='130px';
                document.getElementById('newnote_btn').style.width='60px';
                document.getElementById('newnote_btn').style.height='60px';
                document.getElementById('newnote_btn').style.border='2px solid white';
                document.getElementById('newnote_btn').style.backgroundImage=`url('newnote.png')`;
                dload.style.visibility='visible';
                edit_btn.style.visibility='visible';
            
            } else if(target.tagName==='BUTTON'&&target.id=='imp_btn'){
                
            
                let fromLocalImportant  = JSON.parse(localStorage.getItem('Important'));
                if(fromLocalImportant){
                    Important = fromLocalImportant;
                }else{
                    Important=  {
                        name:'Important', 
                        content:[],
                        value:'', 
                        color:[],
                        time:[],
                        date:[]
                    
                    };
                }
                changeBackgroundImage(target,noteContentIndex,Important,'imp');
                Categorize(Important,1);
                note_count();
                showNote.style.visibility='hidden';
                ulEl.style.visibility='visible';
                document.getElementById('time_insidenote').style.visibility='hidden';
                document.getElementById('newnote_btn').style.marginTop='-20px';
                document.getElementById('newnote_btn').style.marginLeft='130px';
                document.getElementById('newnote_btn').style.width='60px';
                document.getElementById('newnote_btn').style.height='60px';
                document.getElementById('newnote_btn').style.border='2px solid white';
                document.getElementById('newnote_btn').style.backgroundImage=`url('newnote.png')`;
                dload.style.visibility='visible';
                edit_btn.style.visibility='visible';

                }else if(target.tagName==='BUTTON'&&target.id=='personal_btn'){
                    
                    let fromLocalPersonal  = JSON.parse(localStorage.getItem('Personal'));
                    if(fromLocalPersonal){
                        Personal = fromLocalPersonal;
                    } else{
                        Personal=  {
                        name:'Personal', 
                        content:[],
                        value:'', 
                        color:[],
                        time:[],
                        date:[]
                    
                    };

                    }
                    changeBackgroundImage(target,noteContentIndex,Personal,'personal');
                    Categorize(Personal,1);
                    note_count();
                    showNote.style.visibility='hidden';
                    ulEl.style.visibility='visible';
                    document.getElementById('time_insidenote').style.visibility='hidden';
                    document.getElementById('newnote_btn').style.marginTop='-20px';
                    document.getElementById('newnote_btn').style.marginLeft='130px';
                    document.getElementById('newnote_btn').style.width='60px';
                    document.getElementById('newnote_btn').style.height='60px';
                    document.getElementById('newnote_btn').style.border='2px solid white';
                    document.getElementById('newnote_btn').style.backgroundImage=`url('newnote.png')`;
                    dload.style.visibility='visible';
                    edit_btn.style.visibility='visible';
                    
                
                }


                }

    //grab url from chrome tab
    grabBtn.addEventListener("click",function(){ 
        chrome.tabs.query({active: true,currentWindow: true},function(tabs){
            if(myLeads==null){ // otherwise myleads becomes null if fromlocal is deleted
                  myLeads=[];
                }
       
       
      
            
        textArea.value += tabs[0].url;
      
            
              })
        })
        
      



    //saving text box entered notes
    inputBtn.addEventListener("click",function(){
        document.getElementById('show_category').innerHTML=`Recent <img id="img_currentcategory" src="recent.png">`;
            
        if(inputEl.value == '' && textArea.value==''){

            } 
        else{
            
            let newColor = textArea.style.backgroundColor;
           
            if(newColor===''){
                newColor='white';
            }
                noteColor.unshift(newColor);
                localStorage.setItem('noteColor',JSON.stringify(noteColor));
            
            
            

            let dateVal = new Date().toLocaleTimeString();
            dateArray.unshift(dateVal);
            localStorage.setItem('date',JSON.stringify(dateArray));

            let dateYearVal = new Date().toLocaleString('en-us',{day:'numeric',month:'short', year:'numeric'})
            dateYearArray.unshift(dateYearVal);
            localStorage.setItem('dateYear',JSON.stringify(dateYearArray));
            

            if(textArea.value==''){
                textArea.value = '';
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
                renderLeads(myLeads,noteContent,noteColor,dateArray,dateYearArray);
                inputEl.value='';                                                                                           
                ulEl.innerHTML = liStr;                   
                return false;
            }
            })
    
        //changing color of background
    styleBtn.addEventListener("click",function(){
        textArea.value="";
        styleBtn.style.visibility='hidden';
        countTextArea.style.visibility='hidden';
    
    })

    // function getRandomColor() {
    //     let letters = '0123456789ABCDEF';
    //     let color = '#';
    //     for (let i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //                }
    //     return color;
    //                 }
  

    function search(){

            let templeads=[]
            let tempnoteContent=[]
            let tempnoteColor = []
            let tempdateArray=[]
            let k=0;
             for(i=0;i<myLeads.length;i++){
                 if(myLeads[i].toLowerCase().includes(textSearch.value.toLowerCase())||noteContent[i].toLowerCase().includes(textSearch.value.toLowerCase())){
                    
                     templeads[k] = myLeads[i].replace(textSearch.value,`<mark id="mark_search">${textSearch.value}</mark>`)            
                      //  templeads[k]=myLeads[i].replace(textSearch.value.toLowerCase(),`<mark id="mark_search">${textSearch.value.toLowerCase()}</mark>`)
                     tempnoteContent[k]=noteContent[i].replace(textSearch.value,`<mark id="mark_search">${textSearch.value}</mark>`) ;
                     tempnoteColor[k]=noteColor[i];
                     tempdateArray[k]=dateArray[i];
                     k++;
                 }else{
     
                 }
             }
             ulEl.innerHTML="";
             liStr = '';
             renderLeads(templeads,tempnoteContent,noteColor,dateArray,dateYearArray);
             ulEl.innerHTML = liStr ;
        
    }



    textSearch.onkeyup = function(){
      
       contInp.style.visibility='hidden';
       document.getElementById('top_note').style.visibility='hidden'; 
    //    ulCategory.style.visibility='hidden';
        // ulEl.style.marginTop = '150px';
       document.getElementById('show_category').innerHTML=`Search results <img id="img_currentcategory" src="search2.png">`; 
    //    ulEl.style.height = 'auto';
       ulEl.style.visibility = 'visible';
       showNote.style.visibility = 'hidden';

       if(textSearch.value===""){
        // ulEl.style.marginTop = '265px';
        // ulEl.style.height = '260px';
        document.getElementById('show_category').innerHTML=`Recent <img id="img_currentcategory" src="recent.png">`; 
    
        ulCategory.style.visibility='visible';
        document.getElementById('show_category').style.visibility='visible'; 
        edit_btn.style.visibility='visible';
        searchFlag=0;
       }
       searchFlag=1;
       search();
       clickLI();
        
    }


    // searchBtn.addEventListener('click',function(){
    //     clickLI();
    //     search();

    // })






















    editBack.addEventListener('click',function(){
            editBack.style.visibility='hidden';
            // dload.style.visibility='visible';
            // labelRecent.style.visibility='visible';
            edit_btn.style.backgroundImage='url(edit1.png)'
            editClickStatus=0
            edit_btn.style.color ='whitesmoke';
            inputBtn.disabled=false;
            grabBtn.disabled=false;
            mainchk.style.visibility = 'hidden';
            if(mainchk.checked){
                mainchk.checked=false
            }
            for(let i=0;i<chkbx.length;i++){
                backBtns[i].style.visibility='visible';
                if(chkbx[i].checked){
                    chkbx[i].checked = false;
                    chkbx[i].style.visibility = 'hidden';
                }else{
                    chkbx[i].style.visibility = 'hidden';
                }
            }

    })













      //edit and delete button
    edit_btn.addEventListener('click',function(){
      
        // ulEl.style.pointerEvents='none';
        if(editClickStatus===0){
            edit_btn.style.visibility='visible';
            editBack.style.visibility='visible';
            // dload.style.visibility='hidden';
            // labelRecent.style.visibility='hidden';
            edit_btn.style.backgroundImage='url(delete1.png)'
            editClickStatus = 1 // as it will change to delete functionality
          
            grabBtn.disabled=true;
            dload.disabled=true;
            edit_btn.style.color ='darkred';
            
            mainchk.style.visibility = 'visible';
           
            for(let i=0;i<chkbx.length;i++){
                chkbx[i].style.visibility = 'visible';
                // chkbx[i].style.pointerEvents='auto';
                backBtns[i].style.visibility='hidden';
            }
               } 
        else {
            // ulEl.style.pointerEvents='auto';
            editBack.style.visibility='hidden';
            // dload.style.visibility='visible';
            // labelRecent.style.visibility='visible';
            edit_btn.style.backgroundImage='url(edit1.png)'
            editClickStatus=0
            edit_btn.style.color ='whitesmoke';
            inputBtn.disabled=false;
            grabBtn.disabled=false;
            
            mainchk.style.visibility = 'hidden';
            if(mainchk.checked){//meaning all items will be deleted
                //everything is basically set to default
                 
             localStorage.clear();
                edit_btn.disabled=true;
                myLeads=[];
                dateArray=[];
                dateYearArray=[];
                noteContent=[];
                noteContentIndex=0;
           
                ulEl.innerHTML="";
                edit_btn.style.visibility='visible';
                document.getElementById('show_category').innerHTML=`Start Adding Notes <img id="img_currentcategory" src="addnewnote.png">`;
       

        
            } else{ //meaning only selected items are to be deleted 
                //saving a copy of current arrays we have, as original will be modified to contain selected items only
              
                let myLeadsCopy = myLeads;
               let noteContentCopy = noteContent;
               let dateArrayCopy =  dateArray;
               let dateYearArrayCopy = dateYearArray;
               let noteColorCopy = noteColor;
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
                            document.getElementById('show_category').innerHTML=`Start Adding Notes <img id="img_currentcategory" src="addnewnote.png">`;
       
                        }else{
                            localStorage.clear();
                           
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
                            renderLeads(myLeads,noteContent,noteColor,dateArray,dateYearArray);
                            ulEl.innerHTML = liStr ;
                              }
            
                        for(let i=0;i<chkbx.length;i++){
                            chkbx[i].style.visibility = 'hidden';
                            backBtns[i].style.visibility='visible';
                         }
                      
                             }
     
                                  }
                  
                        clickLI('delete');
                      
       
    })



       
    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement; 
        }
        


    //getting the note HTML with note content 
    function renderLeads(myLeads,noteContent,noteColor,dateArray,dateYearArray){
       let rendermyLeads = myLeads;
       let rendernoteContent = noteContent;
       let rendernoteColor = noteColor;
       let renderdateArray = dateArray;
       let renderdateYearArray = dateYearArray;
       
                for(let i=0;i<rendermyLeads.length;i++){
                        liStr += 
                        ` <li class="li_notes" style="background-color: ${rendernoteColor[i]}"> 
                            <label class="lbl">${rendernoteContent[i]}</label>   </br> 
                               <div class="top_insideli"> 
                                  <label  class="title_label">${rendermyLeads[i]}</label>
                                      <input type="checkbox" class="chk" >  </input> 
                                           <button class="done_btn" title="Note completed"></button>
                                                  <button class="download_note" title="Download note as txt"></button></div>
                                                         <label  class="date_label">${renderdateArray[i]}</label>
                                                         <label  title="Date added" class="dateyear_label">${renderdateYearArray[i]}</label>
                                                         <button title="Add to Favourites" class="tag_btnsfav" id="fav_btn">  </button>  
                                                         <button title="Add to Important" class="tag_btnsimp" id="imp_btn">  </button>   
                                                         <button title="Add to Personal" class="tag_btnspersonal" id="personal_btn">  </button>   
                                                            </li>` 
                  
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
        let text= `Title:${ulEl.textContent}`;
        // text='I have changed the text';
        el("#download").addEventListener("click", () => {
        createAndDownload(text, "text/plain");
              });

     return false;
})