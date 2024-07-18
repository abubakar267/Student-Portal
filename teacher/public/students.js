// Ensure this script is included in your HTML file
function viewPopUp(content) {
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popup-content");
    popupContent.innerText = `${content}  `;

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

function editPopUp(content, id) {
    console.log('got id', id);
    const popup = document.getElementById("edit-popup");
    const popupContent = document.getElementById("popup-content");
    popupContent.innerText = `${content}  `;

    popup.style.display = "block";

    const edit_submit = document.getElementById("edit-submit");

    edit_submit.addEventListener("click", async function () {
        console.log("form submitted");
        const val = document.getElementById("marks").value;
        console.log(val);
        if (val !== '') {
            const token = localStorage.getItem('token');
            const marksResponse = await fetch(`/api/marks/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ marks: val })
            });

            if (!marksResponse.ok) {
                throw new Error('Error submitting marks');
            }

            const { teacherId } = await marksResponse.json();
            console.log("marks", teacherId);
            popup.style.display = "none";
        }
    });

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



                const view = document.createElement("button");
                view.className = 'view';
                view.innerText = "View";
                const edit = document.createElement("button");
                edit.className = 'edit';
                edit.innerText = "Edit";
                const newContent = document.createElement("div");
                const buttonDiv = document.createElement("div");
                buttonDiv.setAttribute("class", "button-div");
                
                newContent.innerText = `${element} ${studentNames[index]}`;
                newContent.setAttribute("id", element);
                newContent.setAttribute("class", "new-content");
                newContent.style.width = "70%"

                buttonDiv.appendChild(view)
                buttonDiv.appendChild(edit)

                studentDiv.appendChild(newContent)
                studentDiv.appendChild(buttonDiv)
           
                // newContent.appendChild(view);
                // newContent.appendChild(edit);
                list.appendChild(studentDiv);

                view.addEventListener('click', async function () {
                    const marksResponse = await fetch(`/api/marks/${element}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!marksResponse.ok) {
                        throw new Error('Error fetching user data');
                    }

                    const { marks } = await marksResponse.json();

                    // console.log('marks',marks);

                    console.log(marks);
                    console.log(studentIds);
                    const studentMarks = marks[0].obtainedMarks
                    const total = marks[0].totalMarks
                    const code = marks[0].courseCode
                    console.log(studentMarks);
                    
                    // viewPopUp(`Viewing marks for ${studentNames[index]}  ${studentMarks} `);
                    const marksContainer = document.getElementById('marksContainer');
                    marksContainer.innerHTML =  `
                        <h2>${code}</h2>
                        <br>
                        <p>Marks : ${studentMarks} / ${total}</p>
                        
                    `

                    // Show the modal
                    const modal = document.getElementById('marksModal');
                    modal.style.display = 'block';

                    // Close the modal when the close button is clicked
                    const closeButton = document.querySelector('.close');
                    closeButton.addEventListener('click', () => {
                        modal.style.display = 'none';
                    });

                    // Close the modal when clicking outside of the modal content
                    window.addEventListener('click', (event) => {
                        if (event.target === modal) {
                            modal.style.display = 'none';
                        }
                    });

                });

                edit.addEventListener('click', async function () {
                    editPopUp(`Editing marks for ${studentNames[index]}`, element);
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
});
