import React, { useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import DataArtikelForm from './partials/DataArtikelForm'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import getDefaultValue from './getDefaultValue'
import useInputForm, { serialize } from '../../../../hooks/useInputForm'
import useQuery from '../../../../hooks/useQuery'

function getCurrentDate () {
  try {
    return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(
      new Date())
  } catch {
    try {
      return new Date().toLocaleString('id-ID')
    } catch {
      return new Date().toString()
    }
  }
}

function ArtikelForm () {
  const history = useHistory()
  const { id } = useParams()
  const isEdit = !!id
  const { data: article, isSuccess, error, isLoading } = useQuery(() => {
    if (id) {
      return axios.get(process.env.PTB_BACKEND_ENDPOINT+`/api/article/${id}`)
        .then(res => res.data)
    }
  }, { isEnabled: isEdit })

  const [formValues, setFormValues, getInputProps] = useInputForm(
    () => getDefaultValue())

  useEffect(() => {
    if (isSuccess) {
      setFormValues(article)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, isSuccess])

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <div className={'p-6'}>
      <Card className={'p-4'}>
        <Card.Title>
          <h1 className={'text-black'}>
            {
              isEdit ? 'Ubah Data Artikel' : 'Tambah Data Artikel'
            }
          </h1>
        </Card.Title>

        <Card.Body>
          {isEdit && isLoading ? <div>Loading...</div>
            : (
              <Form
                className={'grid gap-y-2'}
                onSubmit={(e) => {
                  e.preventDefault()

                  const queryValues = {
                    ...formValues,
                    date: getCurrentDate(),
                  }

                  const query = `${serialize(queryValues)}`

                  if (isEdit) {
                    axios.put(
                      process.env.PTB_BACKEND_ENDPOINT+`/api/article/${id}?` + query)
                      .then(() => {
                        alert('Berhasil mengupdate data')
                        history.push('/dataArtikel')
                      })
                      .catch((err) => {
                        alert('Gagal mengupdate data\n' + err.message)
                      })
                  } else {
                    axios.post(process.env.PTB_BACKEND_ENDPOINT+`/api/article?` + query)
                      .then(() => {
                        alert('Berhasil menambahkan data')
                        history.push('/dataArtikel')
                      })
                      .catch((err) => {
                        alert('Gagal menambahkan data\n' + err.message)
                      })
                  }
                }}
              >
                <h2 className={'text-slate-700'}>Data Umum</h2>
                <DataArtikelForm
                  formValues={formValues}
                  setFormValues={setFormValues}
                  getInputProps={getInputProps}
                />

                <Button variant="primary" type="submit" size={'lg'}>
                  Simpan
                </Button>
              </Form>
            )
          }
        </Card.Body>

      </Card>
    </div>
  )
}

export default ArtikelForm
