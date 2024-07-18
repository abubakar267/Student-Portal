document.addEventListener('DOMContentLoaded', async function () {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        // Fetch user data
        const teacherResponse = await fetch('/api/auth/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!teacherResponse.ok) {
            throw new Error('Error fetching user data');
        }

        const { teacher } = await teacherResponse.json();
        const teacherInfo = document.getElementById('teacherInfo');
        teacherInfo.innerHTML = `<h2>Welcome, ${teacher.name}!</h2>`;


        // const enroll_btn = document.createElement("button")
        // const portal = document.createElement("button")
        // enroll_btn.setAttribute("id","enroll")
        // enroll_btn.innerHTML = "Course Enrollment"
        // portal.setAttribute("id","portal")
        // portal.innerHTML = "portal"

        const my_content = document.getElementById("teacherInfo")
        // my_content.appendChild(enroll_btn)
        // my_content.appendChild(portal)

        const enroll_btn = document.getElementById("enrollment")
        const portal = document.getElementById("portal")


        enroll_btn.addEventListener("click",async(req,res)=>{
            this.location.href = "/enroll"
        })


        portal.addEventListener('click',async (req,res)=>{
            this.location.href = "/portal"
        })




    } catch (error) {
        console.error('Error:', error);
    }



});
