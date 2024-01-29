import React, { useState } from 'react'
import {
  UserInfo,
  UserInfoResponse,
  AccountInfoItem,
  ModalProps,
} from '../types'
import { Stack, Button, Form, InputGroup, ListGroup } from 'react-bootstrap'
import CustomModal from '../components/Modal'
import { messages, modalTitles } from '../constants/messages'

const MainScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [accountInfo, setAccountInfo] = useState<AccountInfoItem[] | null>(null)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)

  const handleClickButton = () => {
    // ユーザーIDは生の整数をチェックする
    const id = parseInt(userId, 10)
    if (isNaN(id) || id < 1) {
      setUserInfo(null)
      showErrorModal(messages.msg002)
      return
    }

    // ユーザー情報を取得する
    fetchUserData()
  }

  const fetchUserData = async () => {
    try {
      setIsLoading(true)
      // ユーザー情報を取得する
      const userRes = await fetch(
        `https://sample-accounts-api.herokuapp.com/users/${userId}`,
      )
      const userData: UserInfoResponse = await userRes.json()
      setUserInfo(userData.attributes)
      // ユーザーの金融情報を取得する
      const accountsRes = await fetch(
        `https://sample-accounts-api.herokuapp.com/users/${userId}/accounts`,
      )
      const accountsData: AccountInfoItem[] = await accountsRes.json()
      setAccountInfo(accountsData)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error)
      setUserInfo(null)
      showErrorModal(messages.msg001)
      setIsLoading(false)
    }
  }

  const showErrorModal = (message: string) => {
    setModalProps({
      modalShow: true,
      title: modalTitles.error,
      message,
      onHide: () => setModalProps(null),
    })
  }

  return (
    <div>
      <h4 className="ps-2 border-left">ユーザー金融情報</h4>
      <Stack direction="horizontal" gap={2} className="mt-4 mb-4">
        <InputGroup>
          <InputGroup.Text id="basic-addon3">
            https://sample-accounts-api.herokuapp.com/users/
          </InputGroup.Text>
          <Form.Control
            id="basic-url"
            aria-describedby="basic-addon3"
            type="number"
            step={1}
            placeholder="ユーザーIDを入力としてください"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={isLoading}
          />
        </InputGroup>
        <Button
          className="ms-auto"
          as="input"
          type="reset"
          value="送信"
          variant="outline-primary"
          onClick={handleClickButton}
          disabled={isLoading}
        />
      </Stack>
      {userInfo && accountInfo && (
        <div>
          <h5>ユーザー名： {userInfo.name}</h5>
          <ListGroup as="ol" numbered>
            {accountInfo.map((account: AccountInfoItem) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <span>{account.attributes.name}</span>
                <span className="ms-auto">
                  残高：¥{account.attributes.balance.toLocaleString()}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
      {modalProps && (
        <CustomModal
          title={modalProps.title}
          modalShow={modalProps.modalShow}
          message={modalProps.message}
          onHide={modalProps.onHide}
        />
      )}
    </div>
  )
}

export default MainScreen
