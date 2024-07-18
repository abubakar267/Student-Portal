

//setting status as global property
let globalStatus = null;


function viewPopUp(content) {
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popup-content");
    popupContent.innerHTML = content; // Use innerHTML to allow HTML formatting
  
    popup.style.display = "block";





  
    const closeButton = document.getElementById("close-popup");
    closeButton.onclick = function () {
      popup.style.display = "none";
    };
  
    window.onclick = function (event) {
      if (event.target == popup) {
        popup.style.display = "none";
      }
    };
  }


document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        // Fetch user data
        const studentResponse = await fetch('/api/students', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!studentResponse.ok) {
            throw new Error('Error fetching user data');
        }

        const { myStudents, studentIds, studentNames } = await studentResponse.json();

        if (myStudents.length === 0) {
            console.log("No students");
        } else {
            const list = document.getElementById("student-list");

            studentIds.forEach((element, index) => {


                const studentDiv = document.createElement("div");
                studentDiv.setAttribute("class", "student-div");

                const edit = document.createElement("button");
                edit.className = 'edit';
                edit.innerText = "Edit";
                const view = document.createElement("button");
               
                view.className = 'view';
                view.innerText = "View";
                const add = document.createElement("button");
                add.className = 'add';
                add.innerText = "Add";
                const newContent = document.createElement("div");
                const buttonDiv = document.createElement("div");
                buttonDiv.setAttribute("class", "button-div");
                
                newContent.innerText = `${element} ${studentNames[index]}`;
                newContent.setAttribute("id", element);

                newContent.setAttribute("class", "new-content");
                newContent.style.width = "90%"

                view.setAttribute("id",element)

                buttonDiv.appendChild(add)
                buttonDiv.appendChild(edit)
                buttonDiv.appendChild(view)

                studentDiv.appendChild(newContent)
                studentDiv.appendChild(buttonDiv)
           
                // newContent.appendChild(view);
                // newContent.appendChild(edit);
                list.appendChild(studentDiv);


                const attendanceData = {
                    studentId: element
                  };

                add.addEventListener('click', async function () {
                    console.log('hahah1');



                    const statusResponse = await fetch(`/api/attendance/${element}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
            
                    if (!statusResponse.ok) {
                        throw new Error('Error status user data');
                    }
            
                    const { status} = await statusResponse.json();
                    console.log(status);


                    //add pop up functionality here to
                    const popupContent = `Student: ${studentNames[index]}
                    <br>
                    <br>
                    <label for="status">Status</label>
                    <select id="status">
                    <option value="${status[0]}">${status[0]}</option>
                    <option value="${status[1]}">${status[1]}</option>
                    <option value="${status[2]}">${status[2]}</option>
                    </select>
                    <br>
                    <br>
                    <label for="Date">Date:</label>
                    <input type="date" id="date" name="date" required>
                    </input>
                    <br>
                    <br>
                    <button type="submit" id="add">Submit</button>
                    `

    // 2. Call a function to display the popup with the content
                    viewPopUp(popupContent);

                    const addButton = document.getElementById("add");
                    const newStatus = document.getElementById("status");
                    const newDate = document.getElementById("date");
                    
                    addButton.addEventListener("click",async (event)=>{
                        if (newDate.value === "") {
                            event.preventDefault(); // Prevent form submission
                            alert("Please select a date!"); // Display validation message  
                    }

                    const popup = document.getElementById("popup");
                    popup.style.display="none"

                    const ndate = newDate.value
                const nstatus = newStatus.value

                


                    const Response = await fetch(`/api/attendance/${element}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        
                        },
                        body: JSON.stringify({ndate,nstatus})

                    });


                    if (!Response.ok) {
                        throw new Error('Error fetching user data');
                    }

                    console.log('hahah3');

                    const { addedAttendance } = await Response.json();
                    console.log('hahah4');
                    


                    // console.log(newStatus.value,newDate.value);
                
                })
                
                    // console.log('marks',marks);


                   
                });



                view.addEventListener('click', async function () {
                    const id = document.getElementsByClassName("view")
                    console.log(id[index].id);
                    let std_id = {id:id[index].id}

                    

                    const Response = await fetch(`/api/view`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        
                        },
                        body: JSON.stringify(std_id)

                    });

                    
                    if (!Response.ok) {
                        throw new Error('Error fetching user data');
                    }

                    console.log('posted attendance');

                    const sentId  = await Response.json();
                    console.log('hahah4',sentId);
                    location.href = `/view`

                    console.log('hahaha');
                });




                //edit

                edit.addEventListener('click', async function () {

                    console.log('edit button clicked');
                    const id = document.getElementsByClassName("view")
                    console.log(id[index].id);
                    let std_id = {id:id[index].id}

                    const statusResponse = await fetch(`/api/attendance/${element}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
            
                    if (!statusResponse.ok) {
                        throw new Error('Error status user data');
                    }
            
                    const { status} = await statusResponse.json();
                    console.log(status);

                    const popupContent = `Student: ${studentNames[index]}
                    <br>
                    <br>
                    <label for="status">Status</label>
                    <select id="oldstatus">
                    <option value="${status[0]}">${status[0]}</option>
                    <option value="${status[1]}">${status[1]}</option>
                    <option value="${status[2]}">${status[2]}</option>
                    </select>

                    <label for="status">New Status</label>
                    <select id="newstatus">
                    <option value="${status[0]}">${status[0]}</option>
                    <option value="${status[1]}">${status[1]}</option>
                    <option value="${status[2]}">${status[2]}</option>
                    </select>


                    <br>
                    <br>
                    <label for="Date">Old Date:</label>
                    <input type="date" id="olddate" name="date" required>
                    </input>

                    <label for="Date">New Date:</label>
                    <input type="date" id="newdate" name="date" required>
                    </input>
                    <br>
                    <br>
                    <button type="submit" id="edit">Submit</button>
                    `

    // 2. Call a function to display the popup with the content
                    viewPopUp(popupContent);

                    const editButton = document.getElementById("edit");
                    const oldStatus = document.getElementById("oldstatus");
                    const newStatus = document.getElementById("newstatus");
                    const oldDate = document.getElementById("olddate");
                    const newDate = document.getElementById("newdate");
                    
                    editButton.addEventListener("click",async (event)=>{
                        if (newDate.value === "" || oldDate.value === "") {
                            event.preventDefault(); // Prevent form submission
                            alert("date cannot be unselected"); // Display validation message  
                    }
                    const popup = document.getElementById("popup");
                    popup.style.display="none"

                    const odate = oldDate.value
                    const ostatus = oldStatus.value
                    const ndate = newDate.value
                const nstatus = newStatus.value

                console.log(odate,ndate);
                console.log(ostatus,nstatus);


                    const Response = await fetch(`/api/attendance/${std_id.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        
                        },
                        body: JSON.stringify({odate,ndate,ostatus,nstatus,stdid:std_id.id})
                    });

                    
                    if (!Response.ok) {
                        throw new Error('Error fetching user data');
                    }

                    console.log('hahah3');

                    const updatedAttendance  = await Response.json();
                    console.log('attendance updated',updatedAttendance);

                })


            

                //.............











            });

            })
        }
    } catch (error) {
        console.log(error);
    }
});
