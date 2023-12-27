export async function page(data) {
  return (
    <ol>
      {data.map((e) => (
        <li>
          <p>
            IP: {e.ip}
          </p>
          <p>
            User-Agent: {e.ua}
          </p>
          <p>
            Time: {new Date(e.date).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ol>
  )
}
