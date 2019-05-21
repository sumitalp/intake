import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {dateFormatter} from 'utils/dateFormatter'
import {capitalizedStr} from 'utils/textFormatter'

class SearchResultsTable extends Component {
  constructor() {
    super()
    this.state = {
      previousPage: -1,
    }
    this.fetchData = this.fetchData.bind(this)
  }

  columns = [
    {
      Header: '',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      Cell: (row) => {
        return `${(row.page * row.pageSize) + row.index + 1}.`
      },
    },
    {
      id: 'name',
      Header: 'Name',
      accessor: 'fullName',
      Cell: (row) => {
        const personName = row.original.fullName
        return <button className='search-result-button'>{personName}</button> || ''
      },
    },
    {
      Header: 'Date of Birth',
      accessor: 'dateOfBirth',
      Cell: (row) => dateFormatter(row.original.dateOfBirth),
    },
    {
      Header: 'Sex at Birth',
      accessor: 'gender',
      Cell: (row) => capitalizedStr(row.original.gender),
    },
    {
      Header: 'Service Provider County',
      accessor: null,
    },
    {
      Header: 'Service Provider Phone',
      accessor: null,
    },
    {
      id: 'address',
      Header: 'Address',
      accessor: (result) => {
        const address = result.address
        return address ?
          `${address.streetAddress}, ${address.city}, ${address.state} ${address.zip}` :
          ''
      },
    },
    {
      Header: 'Case Status',
      accessor: null,
    },
  ]

  fetchData(pageIndex) {
    const previousPage = this.state.previousPage
    const currentPage = pageIndex + 1
    this.props.setCurrentPageNumber(currentPage)
    if (currentPage > previousPage) {
      this.props.onLoadMoreResults(this.props.personSearchFields)
    }
    this.setState({previousPage: pageIndex})
  }

  setRowAndFetchData(pageSize, pageIndex) {
    const currentPage = pageIndex + 1
    this.props.setCurrentRowNumber(pageSize)
    this.props.setCurrentPageNumber(currentPage)
    this.props.onLoadMoreResults(this.props.personSearchFields)
  }

  render() {
    const {resultsSubset, total, currentRow} = this.props
    return (
      <ReactTable
        columns={this.columns}
        manual
        data={resultsSubset}
        minRows={0}
        pages={Math.ceil(total / currentRow)}
        onPageChange={(pageIndex) => this.fetchData(pageIndex)}
        defaultPageSize={currentRow}
        onPageSizeChange={(pageSize, pageIndex) => this.setRowAndFetchData(pageSize, pageIndex)}
      />
    )
  }
}

SearchResultsTable.propTypes = {
  currentRow: PropTypes.number,
  onLoadMoreResults: PropTypes.func,
  personSearchFields: PropTypes.object,
  results: PropTypes.array,
  resultsSubset: PropTypes.array,
  setCurrentPageNumber: PropTypes.func,
  setCurrentRowNumber: PropTypes.func,
  total: PropTypes.number,
}

export default SearchResultsTable
