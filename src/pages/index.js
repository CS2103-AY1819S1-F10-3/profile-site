import React from 'react'
import Layout from '../components/layout'
import queryString from 'query-string'

const Entity = {
  CLIENT: 'CLIENT',
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
}

const IndexPage = props => {
  const entity = queryString.parse(props.location.search)
  entity.services = entity.services.split(',').map(unprocessedService => {
    const splits = unprocessedService.split(':')
    return {
      type: splits[0],
      cost: splits[1],
    }
  })

  return (
    <Layout>
      <div
        style={{
          background: '#e91e63',
          marginBottom: '1.45rem',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
          }}
        >
          <h1 style={{ margin: 0, color: '#ffffff' }}>{entity.name}</h1>
          <code
            style={{
              paddingLeft: '0.5em',
              paddingRight: '0.5em',
              background: '#f7d2e0',
              color: '#e91e63',
            }}
          >
            {entity.type.toLowerCase()}#{entity.id}
          </code>
        </div>
      </div>
      <div
        style={{
          padding: '0px 1.0875rem 1.45rem',
        }}
      >
        <label>Residential address</label>
        <address>{`123 Fake Rd \n#12-34\nSingapore 123123`}</address>

        <label>Phone number</label>
        <p>+65 91234567</p>

        <label>
          {entity.type === Entity.CLIENT
            ? 'Services requested'
            : 'Services offered'}
        </label>

        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }} />
      </div>
    </Layout>
  )
}

export default IndexPage
