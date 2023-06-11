import React, { useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import FormFaq from './partials/FormFaq'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import getDefaultValue from './getDefaultValue'
import useInputForm, { serialize } from '../../../../hooks/useInputForm'
import useQuery from '../../../../hooks/useQuery'

function FaqForm () {
  const history = useHistory()
  const { id } = useParams()
  const isEdit = !!id
  const { data: faq, isSuccess, error, isLoading } = useQuery(() => {
    if (id) {
      return axios.get(process.env.PTB_BACKEND_ENDPOINT+`/api/faq/${id}`)
        .then(res => res.data)
    }
  }, { isEnabled: isEdit })

  const [formValues, setFormValues, getInputProps] = useInputForm(
    () => getDefaultValue())

  useEffect(() => {
    if (isSuccess) {
      setFormValues(faq)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, isSuccess])

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  console.log('isedit:', isEdit)

  return (
    <div className={'p-6'}>
      <Card className={'p-4'}>
        <Card.Title>
          <h1 className={'text-black'}>
            {
              isEdit ? 'Ubah Data FAQ' : 'Tambah Data FAQ'
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
                    number: -1,
                  }

                  const query = `${serialize(queryValues)}`

                  if (isEdit) {
                    axios.put(process.env.PTB_BACKEND_ENDPOINT+`/api/faq/${id}?` + query)
                      .then(() => {
                        alert('Berhasil mengupdate data')
                        history.push('/dataFaq')
                      })
                      .catch((err) => {
                        alert('Gagal mengupdate data\n' + err.message)
                      })
                  } else {
                    axios.post(process.env.PTB_BACKEND_ENDPOINT+`/api/faq?` + query)
                      .then(() => {
                        alert('Berhasil menambahkan data')
                        history.push('/dataFaq')
                      })
                      .catch((err) => {
                        alert('Gagal menambahkan data\n' + err.message)
                      })
                  }
                }}
              >
                <h2 className={'text-slate-700'}>Data FAQ</h2>
                <FormFaq
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

export default FaqForm
