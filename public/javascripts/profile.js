 // Global state
        let isEditing = false;
        let profileData = {
            name: "Alex Johnson",
            email: "alex.johnson@university.edu",
            yearOfStudy: "3rd Year",
            degree: "Bachelor of Computer Science",
            university: "Tech University",
            location: "San Francisco, CA",
            gpa: "3.8/4.0",
            expectedGraduation: "2025",
            presentPursuing: "",
            locationText: "",
            graduationYearDropdown: ""
        };

        let skills = ["JavaScript", "React", "Node.js", "Python", "Machine Learning", "UI/UX Design"];
        let interests = ["Artificial Intelligence", "Web Development", "Data Science", "Mobile Development"];
        let projects = [
            {
                id: 1,
                title: "E-commerce Platform",
                description: "Full-stack web application with React and Node.js",
                technologies: ["React", "Node.js", "MongoDB", "Express"]
            },
            {
                id: 2,
                title: "AI Chatbot",
                description: "Natural language processing chatbot using Python",
                technologies: ["Python", "TensorFlow", "Flask", "NLP"]
            }
        ];
        let experiences = [
            {
                id: 1,
                title: "Software Engineering Intern",
                company: "TechCorp Inc.",
                duration: "Jun 2024 - Aug 2024",
                description: "Developed web applications using React and contributed to backend APIs"
            }
        ];
        let certifications = [
            {
                id: 1,
                name: "AWS Cloud Practitioner",
                issuer: "Amazon Web Services",
                date: "March 2024",
                credentialId: "AWS-123456"
            }
        ];

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
            renderSkills();
            renderInterests();
            renderProjects();
            renderExperiences();
            renderCertifications();
        });

        function setupEventListeners() {
            // Edit button
            document.getElementById('editBtn').addEventListener('click', toggleEdit);
            
            // Profile image upload
            document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
            
            // Skills
            document.getElementById('addSkillBtn').addEventListener('click', addSkill);
            document.getElementById('newSkillInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addSkill();
            });
            
            // Interests
            document.getElementById('addInterestBtn').addEventListener('click', addInterest);
            document.getElementById('newInterestInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addInterest();
            });
            
            // Location and graduation custom inputs
            document.getElementById('locationSelect').addEventListener('change', handleLocationChange);
            document.getElementById('graduationSelect').addEventListener('change', handleGraduationChange);
            
            // Modal buttons
            document.getElementById('addProjectBtn').addEventListener('click', () => openModal('projectModal'));
            document.getElementById('addExperienceBtn').addEventListener('click', () => openModal('experienceModal'));
            document.getElementById('addCertificationBtn').addEventListener('click', () => openModal('certificationModal'));
            
            // Submit buttons
            document.getElementById('submitProject').addEventListener('click', submitProject);
            document.getElementById('submitExperience').addEventListener('click', submitExperience);
            document.getElementById('submitCertification').addEventListener('click', submitCertification);
            
            // Close modals when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target.classList.contains('modal')) {
                    e.target.style.display = 'none';
                }
            });
        }

        function toggleEdit() {
            isEditing = !isEditing;
            const editBtn = document.getElementById('editBtn');
            const cameraBtn = document.getElementById('cameraBtn');
            
            if (isEditing) {
                editBtn.innerHTML = '<span class="icon">💾</span> Save Changes';
                editBtn.classList.add('editing');
                cameraBtn.classList.remove('hidden');
                
                // Show edit forms
                document.getElementById('academicView').classList.add('hidden');
                document.getElementById('academicEdit').classList.remove('hidden');
                document.getElementById('addSkillContainer').classList.remove('hidden');
                document.getElementById('addInterestContainer').classList.remove('hidden');
                document.getElementById('addProjectBtn').classList.remove('hidden');
                document.getElementById('addExperienceBtn').classList.remove('hidden');
                document.getElementById('addCertificationBtn').classList.remove('hidden');
                
                // Show input fields
                document.getElementById('nameInput').classList.remove('hidden');
                document.getElementById('nameDisplay').classList.add('hidden');
                document.getElementById('emailInput').classList.remove('hidden');
                document.getElementById('emailDisplay').classList.add('hidden');
                
                // Sync form values
                syncFormValues();
                
            } else {
                editBtn.innerHTML = '<span class="icon">✏️</span> Edit Profile';
                editBtn.classList.remove('editing');
                cameraBtn.classList.add('hidden');
                
                // Hide edit forms
                document.getElementById('academicView').classList.remove('hidden');
                document.getElementById('academicEdit').classList.add('hidden');
                document.getElementById('addSkillContainer').classList.add('hidden');
                document.getElementById('addInterestContainer').classList.add('hidden');
                document.getElementById('addProjectBtn').classList.add('hidden');
                document.getElementById('addExperienceBtn').classList.add('hidden');
                document.getElementById('addCertificationBtn').classList.add('hidden');
                
                // Hide input fields
                document.getElementById('nameInput').classList.add('hidden');
                document.getElementById('nameDisplay').classList.remove('hidden');
                document.getElementById('emailInput').classList.add('hidden');
                document.getElementById('emailDisplay').classList.remove('hidden');
                
                // Hide custom inputs
                document.getElementById('customLocationInput').classList.add('hidden');
                document.getElementById('customGraduationInput').classList.add('hidden');
                
                // Save changes
                saveChanges();
            }
            
            // Re-render skills and interests to show/hide remove buttons
            renderSkills();
            renderInterests();
        }

        function syncFormValues() {
            document.getElementById('nameInput').value = profileData.name;
            document.getElementById('emailInput').value = profileData.email;
            document.getElementById('degreeInput').value = profileData.degree;
            document.getElementById('universityInput').value = profileData.university;
            document.getElementById('yearSelect').value = profileData.yearOfStudy;
            document.getElementById('gpaInput').value = profileData.gpa;
            document.getElementById('locationSelect').value = profileData.location;
            document.getElementById('graduationSelect').value = profileData.expectedGraduation;
            document.getElementById('presentPursuingInput').value = profileData.presentPursuing || '';
            document.getElementById('locationTextInput').value = profileData.locationText || '';
            document.getElementById('graduationYearDropdownSelect').value = profileData.graduationYearDropdown || '';
        }

        function saveChanges() {
            // Update profile data
            profileData.name = document.getElementById('nameInput').value;
            profileData.email = document.getElementById('emailInput').value;
            profileData.degree = document.getElementById('degreeInput').value;
            profileData.university = document.getElementById('universityInput').value;
            profileData.yearOfStudy = document.getElementById('yearSelect').value;
            profileData.gpa = document.getElementById('gpaInput').value;
            
            // Handle location
            const locationSelect = document.getElementById('locationSelect');
            const customLocationInput = document.getElementById('customLocationInput');
            if (locationSelect.value === 'custom') {
                profileData.location = customLocationInput.value;
            } else {
                profileData.location = locationSelect.value;
            }
            
            // Handle graduation
            const graduationSelect = document.getElementById('graduationSelect');
            const customGraduationInput = document.getElementById('customGraduationInput');
            if (graduationSelect.value === 'custom') {
                profileData.expectedGraduation = customGraduationInput.value;
            } else {
                profileData.expectedGraduation = graduationSelect.value;
            }
            
            // New fields
            profileData.presentPursuing = document.getElementById('presentPursuingInput').value;
            profileData.locationText = document.getElementById('locationTextInput').value;
            profileData.graduationYearDropdown = document.getElementById('graduationYearDropdownSelect').value;
            
            // Update display elements
            document.getElementById('nameDisplay').textContent = profileData.name;
            document.getElementById('emailDisplay').textContent = profileData.email;
            document.getElementById('yearDisplay').textContent = profileData.yearOfStudy;
            document.getElementById('locationDisplay').textContent = profileData.location;
            document.getElementById('graduationDisplay').textContent = profileData.expectedGraduation;
            
            // Update academic details
            document.getElementById('degreeDisplay').textContent = profileData.degree;
            document.getElementById('universityDisplay').textContent = profileData.university;
            document.getElementById('yearDisplayAcademic').textContent = profileData.yearOfStudy;
            document.getElementById('gpaDisplay').textContent = profileData.gpa;
            document.getElementById('locationDisplayAcademic').textContent = profileData.location;
            document.getElementById('graduationDisplayAcademic').textContent = profileData.expectedGraduation;
            document.getElementById('presentPursuingDisplay').textContent = profileData.presentPursuing || 'Not specified';
            document.getElementById('locationTextDisplay').textContent = profileData.locationText || 'Not specified';
            document.getElementById('graduationYearDropdownDisplay').textContent = profileData.graduationYearDropdown || 'Not specified';
        }

        function handleLocationChange() {
            const locationSelect = document.getElementById('locationSelect');
            const customLocationInput = document.getElementById('customLocationInput');
            
            if (locationSelect.value === 'custom') {
                customLocationInput.classList.remove('hidden');
                customLocationInput.focus();
            } else {
                customLocationInput.classList.add('hidden');
            }
        }

        function handleGraduationChange() {
            const graduationSelect = document.getElementById('graduationSelect');
            const customGraduationInput = document.getElementById('customGraduationInput');
            
            if (graduationSelect.value === 'custom') {
                customGraduationInput.classList.remove('hidden');
                customGraduationInput.focus();
            } else {
                customGraduationInput.classList.add('hidden');
            }
        }

        function handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('profileImg').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }

        function addSkill() {
            const input = document.getElementById('newSkillInput');
            const skill = input.value.trim();
            
            if (skill && !skills.includes(skill)) {
                skills.push(skill);
                input.value = '';
                renderSkills();
            }
        }

        function removeSkill(skill) {
            skills = skills.filter(s => s !== skill);
            renderSkills();
        }

        function renderSkills() {
            const container = document.getElementById('skillsContainer');
            container.innerHTML = '';
            
            skills.forEach(skill => {
                const badge = document.createElement('span');
                badge.className = 'skill-badge';
                badge.innerHTML = skill;
                
                if (isEditing) {
                    badge.innerHTML += `<span class="remove-btn" onclick="removeSkill('${skill}')">×</span>`;
                }
                
                container.appendChild(badge);
            });
        }

        function addInterest() {
            const input = document.getElementById('newInterestInput');
            const interest = input.value.trim();
            
            if (interest && !interests.includes(interest)) {
                interests.push(interest);
                input.value = '';
                renderInterests();
            }
        }

        function removeInterest(interest) {
            interests = interests.filter(i => i !== interest);
            renderInterests();
        }

        function renderInterests() {
            const container = document.getElementById('interestsContainer');
            container.innerHTML = '';
            
            interests.forEach(interest => {
                const badge = document.createElement('span');
                badge.className = 'interest-badge';
                badge.innerHTML = interest;
                
                if (isEditing) {
                    badge.innerHTML += `<span class="remove-btn" onclick="removeInterest('${interest}')">×</span>`;
                }
                
                container.appendChild(badge);
            });
        }

        function renderProjects() {
            const container = document.getElementById('projectsContainer');
            container.innerHTML = '';
            
            projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project-item';
                
                const techBadges = project.technologies.map(tech => 
                    `<span class="tech-badge">${tech}</span>`
                ).join('');
                
                projectDiv.innerHTML = `
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="tech-badges">${techBadges}</div>
                `;
                
                container.appendChild(projectDiv);
            });
        }

        function renderExperiences() {
            const container = document.getElementById('experienceContainer');
            container.innerHTML = '';
            
            experiences.forEach(exp => {
                const expDiv = document.createElement('div');
                expDiv.className = 'experience-item';
                
                expDiv.innerHTML = `
                    <h4>${exp.title}</h4>
                    <p class="company">${exp.company}</p>
                    <p class="duration">${exp.duration}</p>
                    <p class="description">${exp.description}</p>
                `;
                
                container.appendChild(expDiv);
            });
        }

        function renderCertifications() {
            const container = document.getElementById('certificationsContainer');
            container.innerHTML = '';
            
            certifications.forEach(cert => {
                const certDiv = document.createElement('div');
                certDiv.className = 'certification-item';
                
                certDiv.innerHTML = `
                    <div class="cert-info">
                        <h4>${cert.name}</h4>
                        <p>${cert.issuer}</p>
                        <p class="cert-date">${cert.date}</p>
                        ${cert.credentialId ? `<p class="cert-id">ID: ${cert.credentialId}</p>` : ''}
                    </div>
                    <span class="verified-badge">Verified</span>
                `;
                
                container.appendChild(certDiv);
            });
        }

        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
            clearModalForm(modalId);
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        function clearModalForm(modalId) {
            const modal = document.getElementById(modalId);
            const inputs = modal.querySelectorAll('input, textarea');
            inputs.forEach(input => input.value = '');
        }

        function submitProject() {
            const title = document.getElementById('projectTitle').value.trim();
            const description = document.getElementById('projectDescription').value.trim();
            const technologies = document.getElementById('projectTechnologies').value.trim();
            
            if (title && description) {
                const project = {
                    id: Date.now(),
                    title: title,
                    description: description,
                    technologies: technologies ? technologies.split(',').map(t => t.trim()).filter(t => t) : []
                };
                
                projects.push(project);
                renderProjects();
                closeModal('projectModal');
            }
        }

        function submitExperience() {
            const title = document.getElementById('experienceTitle').value.trim();
            const company = document.getElementById('experienceCompany').value.trim();
            const duration = document.getElementById('experienceDuration').value.trim();
            const description = document.getElementById('experienceDescription').value.trim();
            
            if (title && company && duration) {
                const experience = {
                    id: Date.now(),
                    title: title,
                    company: company,
                    duration: duration,
                    description: description
                };
                
                experiences.push(experience);
                renderExperiences();
                closeModal('experienceModal');
            }
        }

        function submitCertification() {
            const name = document.getElementById('certificationName').value.trim();
            const issuer = document.getElementById('certificationIssuer').value.trim();
            const date = document.getElementById('certificationDate').value.trim();
            const credentialId = document.getElementById('certificationId').value.trim();
            
            if (name && issuer && date) {
                const certification = {
                    id: Date.now(),
                    name: name,
                    issuer: issuer,
                    date: date,
                    credentialId: credentialId || null
                };
                
                certifications.push(certification);
                renderCertifications();
                closeModal('certificationModal');
            }
        }