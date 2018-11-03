import React from 'react'
import Layout from '../components/layout'
import queryString from 'query-string'

const Entity = {
  CLIENT: 'client',
  VENDOR: 'vendor',
}

const Color = {
  HOT_PINK: '#e91e63',
  LIGHT_PINK: '#f7d2e0',
  WHITE: '#ffffff',
}

const Header = props => (
  <div
    style={{
      background: Color.HOT_PINK,
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
      {props.children}
    </div>
  </div>
)

const Body = props => (
  <div
    style={{
      padding: '0px 1.0875rem 1.45rem',
    }}
  >
    {props.children}
  </div>
)

const Tag = props => (
  <div
    style={{
      padding: '0.1em 0.5em',
      background: Color.HOT_PINK,
      color: Color.WHITE,
      borderRadius: 3,
      display: 'inline-block',
      width: 'auto',
      marginRight: '0.25em',
    }}
  >
    {props.children}
  </div>
)

const InvalidFormat = props => {
  return (
    <Layout>
      <Header>
        <h1 style={{ margin: 0, color: Color.WHITE }}>
          Invalid URL query format
        </h1>
      </Header>
      <Body>{props.children}</Body>
    </Layout>
  )
}

const IndexPage = props => {
  let entity
  let splits
  try {
    entity = queryString.parse(props.location.search)
    console.log(props.location.search)
    console.log({ entity })

    // Parse services
    entity.services = entity.services.split(',').map(unprocessedService => {
      splits = unprocessedService.split(':')
      return {
        type: splits[0],
        cost: splits[1],
      }
    })

    // Split tags by comma
    entity.tags = entity.tags.split(', ')

    // Remove parenthesis around tags
    entity.tags = entity.tags.map((dirtyTag, index) => {
      let cleanTag = dirtyTag

      if (index === 0) {
        cleanTag = cleanTag.slice(1)
      }

      if (index === entity.tags.length - 1) {
        cleanTag = cleanTag.slice(0, cleanTag.length - 1)
      }

      cleanTag = cleanTag.slice(1)
      cleanTag = cleanTag.slice(0, cleanTag.length - 1)

      return cleanTag
    })
  } catch (error) {
    return (
      <InvalidFormat>
        <pre>{error.stack}</pre>
      </InvalidFormat>
    )
  }

  return (
    <Layout>
      <Header>
        <h1 style={{ margin: 0, color: Color.WHITE }}>{entity.name}</h1>
        <code
          style={{
            paddingLeft: '0.5em',
            paddingRight: '0.5em',
            background: Color.LIGHT_PINK,
            color: Color.HOT_PINK,
          }}
        >
          {entity.type.toLowerCase()}#{entity.id}
        </code>
      </Header>
      <Body>
        {entity.tags && (
          <div style={{ marginBottom: '1em' }}>
            {entity.tags.map(tag => (
              <Tag>{tag}</Tag>
            ))}
          </div>
        )}
        <label>
          {entity.type === Entity.CLIENT
            ? 'Residential address'
            : 'Office address'}
        </label>
        <p>{entity.address || '-'}</p>

        <label>Phone number</label>
        <p>{entity.phone || '-'}</p>

        <label>Email address</label>
        <p>{entity.email || '-'}</p>

        <label>
          {entity.type === Entity.CLIENT
            ? 'Services requested'
            : 'Services offered'}
        </label>
        <ul>
          {entity.services.map(service => {
            if (!service.type || !service.cost) {
              return null
            }

            return (
              <li>
                {service.type} - ${service.cost}
              </li>
            )
          })}
        </ul>
      </Body>
    </Layout>
  )
}

export default IndexPage
