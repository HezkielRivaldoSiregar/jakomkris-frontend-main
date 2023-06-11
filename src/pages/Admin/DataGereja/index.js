import React, { useMemo, useState, useEffect } from 'react'
import {Button,Card, Form, Modal,Table} from 'react-bootstrap'
import useQuery from '../../../hooks/useQuery'
import axios from 'axios'
import usePagination from '../../../hooks/usePagination'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

function DataGereja() {
  const [selectedData, setSelectedData] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const {
    data,
    setData: setChurches,
    isLoading,
    error,
    isSuccess
  } = useQuery(() => {
    return axios.get(process.env.PTB_BACKEND_ENDPOINT+'/api/churches')
      .then(res => res.data?.reverse?.())
  })

  const churches = useMemo(() => {
    if (searchValue) {
      return [...data]?.filter?.(church => {
        return church.properties.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      })
    }
    
    return data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchValue])

  const { pagination, position, range, limit } = usePagination({
    total: churches?.length,
  })

  let history = useHistory();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    console.log(authToken)
    if (authToken) {
      history.push('/datagereja')
    }

    if (!authToken) {
      history.push('/login')
    }
  }, [])
  
  return (
    <div className={'p-6'}>
      <Card className={'p-4'}>
        <Card.Title>
          <h1 className={'text-black'}>Data Gereja</h1>
        </Card.Title>

        <div className={'flex gap-2 justify-between items-center flex-wrap'}>
          <div>
            {isSuccess && pagination}
          </div>

          <div>
            <Link className={'btn btn-success'} to={'/dataGereja/create'}>
              Tambah +
            </Link>
          </div>
        </div>

        {
          isSuccess &&
          <div className={'my-3'}>
            <Form.Control
              className={'max-w-[400px]'}
              id={'search'}
              placeholder={'🔍 Cari Nama Gereja...'}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>
        }

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {
              isSuccess ?
                churches?.slice(...range).map((church, index) => {
                  const { _id, properties } = church
                  return (
                    <tr key={_id}>
                      <td>{(index + 1) + ((position - 1) * limit)}</td>
                      <td>{properties.name}</td>
                      <td>{properties.address}</td>
                      <td className={'flex gap-x-2'}>
                        <Link
                          className={'btn btn-primary'}
                          onClick={() => {
                            setSelectedData(church)
                          }}
                          to={`/dataGereja/edit/${_id}`}
                        >
                          Ubah
                        </Link>
                        <Button
                          variant={'danger'}
                          onClick={() => {
                            setSelectedData(church)
                            setShowDeleteModal(true)
                          }}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  )
                }) :
                <tr>
                  <td colSpan={5}>
                    {isLoading ? 'Loading...' : error?.message}
                  </td>
                </tr>
            }
          </tbody>
        </Table>
        {
          isSuccess && pagination
        }
      </Card>

      <Modal
        animation={false}
        centered show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Hapus
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Apakah anda yakin ingin menghapus data tersebut?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={'secondary'}
            onClick={() => setShowDeleteModal(false)}
          >
            Batal
          </Button>
          <Button
            variant={'danger'}
            onClick={() => {
              axios.delete(
                process.env.PTB_BACKEND_ENDPOINT+`/api/churches/${selectedData._id}`,
              ).then(() => {
                setSelectedData(null)
                setShowDeleteModal(false)
                setChurches(
                  churches?.filter(church => church._id !== selectedData._id))
              }).catch(() => {
                setSelectedData(null)
                setShowDeleteModal(false)
              })
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DataGereja
