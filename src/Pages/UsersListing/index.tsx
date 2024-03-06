import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import { User } from '@types'
import fetchRandomUsers from 'api'
import Loader from 'components/Loader'
import ProfileCard from 'components/ProfileCard'
import UserFilterControls from './UserFilterControls'

interface UsersListingProps {
	page?: number
	noOfResults?: number
}

const UsersListing: React.FC<UsersListingProps> = ({ page = 1 }) => {
	const [userInfo, setUserInfo] = useState({
		page: 1,
		users: [] as User[],
		searchInput: '',
		filterParam: 'All',
		searchParam: ['fname', 'lname', 'email'] as const,
		loading: true
	})

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setUserInfo(prev => ({ ...prev, searchInput: e.target.value }))

	const filterGender = (e: React.ChangeEvent<HTMLSelectElement>) => setUserInfo(prev => ({ ...prev, filterParam: e.target.value }))

	useEffect(() => {
		const fetchData = async () => {
			try {
				setUserInfo(prev => ({ ...prev, loading: true }))
				const res = await fetchRandomUsers({ page })
				setUserInfo(prev => ({
					...prev,
					users: res,
					loading: false
				}))
			} catch (err) {
				console.error(err)
			}
		}

		fetchData()
	}, [page])

	const loadMoreData = async () => {
		try {
			const nextPage = userInfo.page + 1
			const res = await fetchRandomUsers({ page: nextPage })
			setUserInfo(prev => ({
				...prev,
				page: nextPage,
				users: prev.users.concat(res),
				loading: false
			}))
		} catch (err) {
			console.error(err)
		}
	}

	const filterAndSearch = (): User[] => {
		return userInfo.users.filter(user => {
			const firstName = user.name.first.toLowerCase()
			const lastName = user.name.last.toLowerCase()
			const itemGender = user.gender.toLowerCase()
			const normalizedSearch = userInfo.searchInput.toLowerCase()

			return (
				(userInfo.filterParam === 'All' || itemGender === userInfo.filterParam) &&
				userInfo.searchParam.some(param => {
					const propValue = param === 'fname' ? firstName : param === 'lname' ? lastName : user[param]?.toString().toLowerCase() ?? ''
					return propValue.includes(normalizedSearch)
				})
			)
		})
	}

	return (
		<div className='container'>
			<UserFilterControls filterGender={filterGender} handleSearch={handleSearch} />
			<InfiniteScroll
				dataLength={userInfo.users.length}
				hasMore={true}
				loader={<Loader />}
				next={loadMoreData}
				style={{ overflow: 'none' }}
			>
				{userInfo.loading && <Loader />}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{filterAndSearch().map(user => (
						<div className='col-span-1 my-3' key={user.email}>
							<Link to={`/user`} state={{ user }}>
								<ProfileCard user={user} />
							</Link>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	)
}

UsersListing.defaultProps = {
	page: 1,
	noOfResults: 9
}

export default UsersListing
