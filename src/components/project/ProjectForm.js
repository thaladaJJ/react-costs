import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'

import styles from './ProjectForm.module.css'
import { data } from 'react-router-dom'

function ProjectForm ({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState ([])
    const [project, setProject] = useState (projectData || {})

    useEffect (() => {
        fetch ("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories (data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        // console.log(project)
        handleSubmit(project)
    }

    function handleChange (e) {
        setProject ({ ...project, [e.target.name]: e.target.value })
    }

    function handleSelect (e) {
        setProject ({ 
            ...project, 
            category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}> 
            
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name" 
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            
            <Input 
                type="number" 
                text="Orçamento do projeto" 
                name="budget" 
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            
            <Select 
                name="category_id"
                text="Selecione a categoria" 
                options={categories} 
                handleOnChange={handleSelect}
                value={project.category ? project.category.id : ''}
            />

            <Submit text={btnText} />

        </form>
    )
}

export default ProjectForm