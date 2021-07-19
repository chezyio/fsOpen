import React, { useState, useEffect } from 'react'
import svc from './Services'
import './App.css'

const Filter = ({ onChange, value }) => {
  return (
    <div>

      Filter shown with<input value={value} onChange={onChange} />
    </div>

  )
}

const PersonForm = ({ onSubmit, onNameChange, onNumberChange, nameValue, numberValue }) => {
  return (

    <form onSubmit={onSubmit}>
      <div>name: <input value={nameValue} onChange={onNameChange} /></div>
      <div>number: <input value={numberValue} onChange={onNumberChange} /></div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, search, handleDelete }) => {
  return (
    <div>

      {
        persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        ).map(p => {
          return (
            <>
              <p key={p.name}>{p.name} {p.number}</p>
              <button onClick={() => handleDelete(p.id)}>delete</button>
            </>
          )
        })
      }
    </div>
  )
}

const Notification = ({ successMessage, errorMessage }) => {
  if (!successMessage && !errorMessage) {
    return null
  }

  return (
    <div className={`message ${successMessage ? "success" : "error"}`}>
      {successMessage ? successMessage : errorMessage}
    </div>
  );
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // const getData = () => {

  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(res => {
  //       console.log(res);
  //       setPersons(res.data)
  //     })
  // }





  useEffect(() => {
    svc.getAll()
      .then(i => {
        setPersons(i)
      })
      .catch((err) => alert(err));

  }, [])



  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newName)
    console.log(newNumber)
    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson && existingPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
      setNewName('')
      setNewNumber('')
      return;
    }

    if (existingPerson && existingPerson.number !== newNumber) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...existingPerson, number: newNumber };
        const id = existingPerson.id;

        svc
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            setSuccessMessage(`Updated ${changedPerson.name}'s number`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((err) => {
            // setErrorMessage(
            //   `Information of ${changedPerson.name} has already been removed from server`
            // );
            // setTimeout(() => {
            //   setErrorMessage(null);
            // }, 5000);
            // setPersons(persons.filter((p) => p.id !== id));
            // setNewName("");
            // setNewNumber("");

            if (err.res.data) {
              setErrorMessage(err.res.data.error)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            } else {
              setErrorMessage(
                `Information of ${changedPerson.name} has already been removed from server`
              )
              setPersons(persons.filter((p) => p.id !== id))
              setNewName("")
              setNewNumber("")
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }
          });
        setNewName('')
        setNewNumber('')
        return;
      } else {
        return;
      }
    }





    const newPerson = { name: newName, number: newNumber }

    svc.create(newPerson).then((returnedPerson) => {
      setSuccessMessage(`${newPerson.name} added to phonebook`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    })
      .catch((err) => {
        setErrorMessage(err.res.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })


  }

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this person")) {
      svc
        .remove(id)
        .then(() => {
          setSuccessMessage(`Deleted ${persons.find((person) => person.id === id).name}`)
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((err) => {
          setErrorMessage(`${err}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        });
    } else {
      return
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }




  return (
    <div>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} search={search} handleDelete={handleDelete} />

    </div>
  )
}

export default App

