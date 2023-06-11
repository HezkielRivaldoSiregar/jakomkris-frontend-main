import React, { useMemo, useState, useEffect } from 'react'
import {Button, Card, Form, Modal,Table} from 'react-bootstrap'
import useQuery from '../../../hooks/useQuery'
import axios from 'axios'
import usePagination from '../../../hooks/usePagination'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

function DataArtikel () {

    const [selectedData, setSelectedData] = React.useState(null)
    const [showDeleteModal, setShowDeleteModal] = React.useState(false)
    const [searchValue, setSearchValue] = useState('')

    const {
      data,
      setData: setArticles,
      isLoading,
      error,
      isSuccess,
    } = useQuery(() => {
      return axios.get(process.env.PTB_BACKEND_ENDPOINT+'/api/article').then(res => res.data?.reverse?.())
    })

    const articles = useMemo(() => {
      if (searchValue) {
        return [...data]?.filter?.(article => {
          return article.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
        })
      }
      
      return data
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, searchValue])

    const { pagination, position, range, limit } = usePagination({
      total: articles?.length,
    })

    let history = useHistory();

    useEffect(() => {
      let authToken = sessionStorage.getItem('Auth Token')
      console.log(authToken)
      if (authToken) {
        history.push('/dataArtikel')
      }
  
      if (!authToken) {
        history.push('/login')
      }
    }, [])

    return (
      <div className={'p-6'}>
        <Card className={'p-4'}>
          <Card.Title>
            <h1 className={'text-black'}>Data Artikel</h1>
          </Card.Title>

          <div className={'flex justify-between items-center'}>
            <div>
              {isSuccess && pagination}
            </div>

            <Link className={'btn btn-success'} to={'/dataArtikel/create'}>
              Tambah +
            </Link>
          </div>

          {
          isSuccess &&
          <div className={'my-3'}>
            <Form.Control
              className={'max-w-[400px]'}
              id={'search'}
              placeholder={'🔍 Cari Judul Artikel...'}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>
          }

          <Table striped bordered hover responsive>
            <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
            </thead>
            <tbody>
            {
              isSuccess ?
                articles?.slice(...range).map((article, index) => {
                  const { _id } = article
                  return (
                    <tr key={_id}>
                      <td>{(index + 1) + ((position - 1) * limit)}</td>
                      <td>{article.title}</td>
                      <td>{article.date}</td>
                      <td className={'flex gap-x-2'}>
                        <Link
                          className={'btn btn-primary'}
                          onClick={() => {
                            setSelectedData(article)
                          }}
                          to={`/dataArtikel/edit/${_id}`}
                        >
                          Ubah
                        </Link>
                        <Button
                          variant={'danger'}
                          onClick={() => {
                            setSelectedData(article)
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
                  process.env.PTB_BACKEND_ENDPOINT+`/api/article/${selectedData._id}`,
                ).then(() => {
                  setSelectedData(null)
                  setShowDeleteModal(false)
                  setArticles(
                    articles?.filter(article => article._id !== selectedData._id))
                }).catch(() => {
                  setSelectedData(null)
                  setShowDeleteModal(false)
                })
              }}
            >
              Hapus
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  export default DataArtikel
