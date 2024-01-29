export interface UserInfo {
  id: number
  name: string
  account_ids: number[]
}

export interface UserInfoResponse {
  attributes: UserInfo
}

export interface AccountInfo {
  id: number
  user_id: number
  name: string
  balance: number
}

export interface AccountInfoItem {
  attributes: AccountInfo
}

export interface ModalProps {
  modalShow: boolean
  title: string
  message: string
  onHide: () => void
}
