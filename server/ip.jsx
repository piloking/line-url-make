export async function page(data) {
  return (
    <ol>
      {data.map((e) => (
        <li>
          <img alt="icon" class='icon' src={'https://profile.line-scdn.net/' + e.obs} />
          <p>
            [{e.pid}]{e.name}
          </p>
          <br />
        </li>
      ))}
    </ol>
  )
}
