
import React, { useState } from 'react'
import { gql, useMutation } from "@apollo/client";


const EDIT_BORN = gql`
  mutation editBorn(
    $name: String!
    $born: Int!
  ) {
    editBorn(name: $name, born: $born) {
      name
      born
    }
  }

`
const Authors = (props) => {


  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: props.authorsQuery }],
  })

  if (!props.show) {
    return null
  }


  const submit = async (event) => {
    event.preventDefault();

    editBorn({ variables: { name, born } })
    setName('');
    setBorn('');

  };

  return props.fetchedAuthors.loading ? ('loading') : (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.fetchedAuthors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>

      </form>

    </div>
  )
}

export default Authors
