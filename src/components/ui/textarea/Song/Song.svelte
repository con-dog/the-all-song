<script lang="ts">
  import { onMount } from 'svelte'

  let textarea

  // ASCII + special ?
  const numbers = [33, 44, 46, 58, 59, 65533]

  // Upper case
  for (let i = 65; i <= 90; i++) {
    numbers.push(i)
  }

  // Lower case
  for (let i = 97; i <= 122; i++) {
    numbers.push(i)
  }

  for (let i = 128768; i <= 128895; i++) {
    if (![128887, 128888, 128889, 128890].includes(i)) numbers.push(i)
  }

  const hexNumbers = numbers.map((n) => {
    return n.toString(16) // convert to hexadecimal and return the result
  })

  // Create a new array that contains the hex numbers that are smaller than FFFF
  const hexNumbersBelowFFFF = hexNumbers.filter((hex) => {
    return parseInt(hex, 16) <= 0xffff
  })

  const theAllSong = [] // empty array to store selected hex numbers

  for (let i = 0; i < 20000; i++) {
    let randomIndex
    if (Math.random() < 0.5) {
      randomIndex = Math.floor(Math.random() * hexNumbersBelowFFFF.length)
    } else {
      randomIndex = Math.floor(Math.random() * hexNumbers.length)
    }
    theAllSong.push(hexNumbers[randomIndex])
  }

  onMount(() => {
    for (let i = 0; i < theAllSong.length; i += 1) {
      const unicodeChar = String.fromCodePoint(
        parseInt('0x' + theAllSong[i], 16)
      )
      textarea.value = `${textarea.value} ${unicodeChar}`
    }
  })
</script>

<textarea bind:this="{textarea}"> </textarea>

<style lang="scss">
  textarea {
    // font-family: 'Arial Unicode MS', Arial, sans-serif;
    font-size: 1.5rem;
    padding: 0;
    margin: 0;
    border: none;
    width: 100%;
    height: 500px;
    resize: none;
    background-color: black;
    color: white;
  }
</style>
