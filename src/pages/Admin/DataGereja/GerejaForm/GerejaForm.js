import React, { useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import DataUmumForm from './partials/DataUmumForm'
import RisikoBencanaForm from './partials/RisikoBencanaForm'
import KebutuhanKhususForm from './partials/KebutuhanKhususForm'
import KesiapanGerejaForm from './partials/KesiapanGerejaForm'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import getDefaultValue from './getDefaultValue'
import useInputForm, { serialize } from '../../../../hooks/useInputForm'
import useQuery from '../../../../hooks/useQuery'

const punyaTidakOptionElements = (
  <React.Fragment>
    <option value="Tidak punya">Tidak Punya</option>
    <option value="Punya">Punya</option>
  </React.Fragment>
)
const yaTidakOptionElements = (
  <React.Fragment>
    <option value="Tidak">Tidak</option>
    <option value="Ya">Ya</option>
  </React.Fragment>
)

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

function GerejaForm () {
  const history = useHistory()
  const { id } = useParams()
  const isEdit = !!id
  const { data: church, isSuccess, error, isLoading } = useQuery(() => {
    if (id) {
      return axios.get(process.env.PTB_BACKEND_ENDPOINT+`/api/churches/${id}`)
        .then(res => res.data)
    }
  }, { isEnabled: isEdit })

  const [formValues, setFormValues, getInputProps] = useInputForm(
    () => getDefaultValue())

  useEffect(() => {
    if (isSuccess) {
      setFormValues(church)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, isSuccess])

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  console.log("isedit:",isEdit)

  return (
    <div className={'p-6'}>
      <Card className={'p-4'}>
        <Card.Title>
          <h1 className={'text-black'}>
            {
              isEdit ? 'Ubah Data Gereja' : 'Tambah Data Gereja'
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

                  const { geometry, properties } = formValues
                  const {
                    risks,
                    awareness,
                    buildingPreparedness,
                    teamPreparedness,
                    ...rest
                  } = properties

                  const queryValues = {
                    ...risks,
                    ...awareness,
                    ...buildingPreparedness,
                    ...teamPreparedness,
                    ...rest,
                    coordinates: geometry.coordinates,
                    lastUpdate: getCurrentDate(),
                  }

                  const query = `${serialize(queryValues)}`

                  if(isEdit) {
                    axios.put(process.env.PTB_BACKEND_ENDPOINT+`/api/churches/${id}?` + query).then(() => {
                      alert('Berhasil mengupdate data')
                      history.push('/dataGereja')
                    }).catch((err) => {
                      alert('Gagal mengupdate data\n' + err.message)
                    })
                  } else {
                    axios.post(process.env.PTB_BACKEND_ENDPOINT+`/api/churches?` + query).then(() => {
                      alert('Berhasil menambahkan data')
                      history.push('/dataGereja')
                    }).catch((err) => {
                      alert('Gagal menambahkan data\n' + err.message)
                    })
                  }
                }}
              >
                <h2 className={'text-slate-700'}>Data Umum</h2>
                <DataUmumForm
                  formValues={formValues}
                  setFormValues={setFormValues}
                  getInputProps={getInputProps}
                />

                <h2 className={'text-slate-600'}>Risiko Bencana</h2>
                <RisikoBencanaForm
                  formValues={formValues}
                  setFormValues={setFormValues}
                  getInputProps={getInputProps}
                />

                <h2 className={'text-slate-600'}>
                  Kesiapan Gereja Menghadapi Bencana
                </h2>
                <KesiapanGerejaForm
                  formValues={formValues}
                  setFormValues={setFormValues}
                  getInputProps={getInputProps}
                />

                <h2 className={'text-slate-600'}>
                  Kebutuhan Khusus Gereja
                </h2>
                <KebutuhanKhususForm
                  formValues={formValues}
                  setFormValues={setFormValues}
                  getInputProps={getInputProps}
                />

                <h2 className={'text-slate-600'}>
                  Kesadaran Gereja
                </h2>
                <div className={'grid grid-cols-2 gap-x-4'}>
                  {
                    [
                      {
                        controlId: 'properties.awareness.preparedness',
                        label: 'Rencana Kesiapsiagaan',
                        options: punyaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.awareness.emergencyResPlan',
                        label: 'Rencana tanggap darurat',
                        options: punyaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.awareness.evacuationOfficer',
                        label: 'Petugas evakuasi',
                        options: punyaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.awareness.emergencyCommission',
                        label: 'Komisi tanggap darurat bencana',
                        options: punyaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.awareness.evacuationSimulation',
                        label: 'Mengikuti simulasi evakuasi',
                        options: yaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.awareness.facingDisasterProg',
                        label: 'Kegiatan menghadapi bencana',
                        options: yaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.awareness.handlingSkill',
                        label: 'Kemampuan penanganan',
                        options: yaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.awareness.disasterResponseSOP',
                        label: 'Regulasi/SOP respon bencana',
                        options: yaTidakOptionElements,
                      },
                    ].map(({ controlId, label, options }) => {
                      return (
                        <Form.Group controlId={controlId}>
                          <Form.Label>{label}</Form.Label>
                          <Form.Control
                            as={'select'}
                            placeholder={`Masukkan ${label}`}
                            onChange={getInputProps(controlId).onChange}
                            value={getInputProps(controlId).value}
                          >
                            {options}
                          </Form.Control>
                        </Form.Group>
                      )
                    })
                  }
                </div>

                <h2 className={'text-slate-600'}>
                  Bangunan Gereja
                </h2>
                <div className={'grid grid-cols-2 gap-x-4'}>
                  {
                    [
                      {
                        controlId: 'properties.buildingPreparedness.warningSystem',
                        label: 'Sistem peringatan dini',
                        options: punyaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.buildingPreparedness.permanentBuilding',
                        label: 'Bangunan gereja permanen',
                        options: punyaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.buildingPreparedness.doorWindow',
                        label: 'Pintu dan jendela terbuka ke luar',
                        options: yaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.buildingPreparedness.buildingCode',
                        label: 'Gereja sesuai building code',
                        options: yaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.buildingPreparedness.constructionDoc',
                        label: 'Dokumen pembangunan gedung',
                        options: punyaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.buildingPreparedness.earthquakeResistant',
                        label: 'Bangunan tahan gempa',
                        options: yaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.buildingPreparedness.faciltyEndanger',
                        label: 'SarPras berpotensi membahayakan jemaat',
                        options: yaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.buildingPreparedness.evacuationPath',
                        label: 'Jalur/rute evakuasi',
                        options: yaTidakOptionElements,
                      },
                    ].map(({ controlId, label, options }) => {
                      return (
                        <Form.Group controlId={controlId}>
                          <Form.Label>{label}</Form.Label>
                          <Form.Control
                            as={'select'}
                            placeholder={`Masukkan ${label}`}
                            onChange={getInputProps(controlId).onChange}
                            value={getInputProps(controlId).value}
                          >
                            {options}
                          </Form.Control>
                        </Form.Group>
                      )
                    })
                  }
                </div>

                <h2 className={'text-slate-600'}>
                  Team Bencana Gereja
                </h2>
                <div className={'grid grid-cols-2 gap-x-4'}>
                  {
                    [
                      {
                        controlId: 'properties.teamPreparedness.specialBudget',
                        label: 'Gereja memiliki alokasi anggaran khusus',
                        options: yaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.teamPreparedness.emergencyResponse',
                        label: 'Sosialisasi penanganan darurat bencana',
                        options: yaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.teamPreparedness.economicDev',
                        label: 'Pengembangan Ekonomi',
                        options: yaTidakOptionElements,
                      },
                      {
                        controlId: 'properties.teamPreparedness.churchEducation',
                        label: 'Edukasi yang dilakukan Gereja',
                        options: yaTidakOptionElements,
                      },
                    ].map(({ controlId, label, options }) => {
                      return (
                        <Form.Group controlId={controlId}>
                          <Form.Label>{label}</Form.Label>
                          <Form.Control
                            as={'select'}
                            placeholder={`Masukkan ${label}`}
                            onChange={getInputProps(controlId).onChange}
                            value={getInputProps(controlId).value}
                          >
                            {options}
                          </Form.Control>
                        </Form.Group>
                      )
                    })
                  }
                </div>

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

export default GerejaForm
