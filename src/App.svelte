<script lang="ts">
  import Article from './components/ui/article/Article.svelte'

  let p
  let textarea

  async function handlePlay() {
    const story = []
    const inputText = textarea.value
    const sentences = inputText.replace(/\s+/g, ' ').split(/(?<=[.?])\s+/)
    for (let sentence of sentences) {
      const components = sentence.replace(/\s+/g, ' ').split(/(?<=[,:;])\s+/)
      story.push(...components)
    }

    // Read the story
    for (let component of story) {
      const wordCount = component.split(' ').length
      let containsPeriod = false
      if (component.includes('.')) containsPeriod = true
      p.innerText = component
      await sleep(wordCount, containsPeriod)
    }
  }

  function sleep(wordCount, containsPeriod) {
    const base = 100
    const tempo = 3
    let ms = base * tempo * wordCount
    if (wordCount <= 3) {
      ms = base * tempo * 3
    }
    if (containsPeriod) {
      ms += base * tempo
    }
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
</script>

<main>
  <textarea bind:this="{textarea}">
    “I would not take this thing, if it lay by the highway. Not were Minas
    Tirith falling in ruin and I alone could save her, so, using the weapon of
    the Dark Lord for her good and my glory. No, I do not wish for such
    triumphs, Frodo son of Drogo... “For myself, I would see the White Tree
    flower again in the courts of the kings, and the Silver Crown return, and
    Minas Tirith in peace: Minas Anor again as of old, full of light, high and
    fair, beautiful as a queen among other queens: not a mistress of many
    slaves, nay, not even a kind mistress of willing slaves [Galadriel!]. War
    must be, while we defend our lives against a destroyer who would devour us
    all; but I do not love the bright sword for its sharpness, nor the arrow for
    its swiftness, nor the warrior for his glory. I love only that which they
    defend: the city of the Men of Numenor; and I would have loved her for her
    memory, her ancientry, her beauty, and her present wisdom. Not feared, save
    as men may fear the dignity of a man, old and wise.”</textarea
  >
  <button on:click="{handlePlay}">PLAY</button>
  <hr />
  <article>
    <p bind:this="{p}"></p>
  </article>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-family: 'Univers LT Pro';
  }
  textarea {
    width: 50rem;
    height: 10rem;
  }
  article {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    padding: 4rem 6rem;
    font-size: 1.75rem;
    width: 40rem;
    font-family: 'Univers LT Pro';
    color: white;
    background-color: black;
    height: auto;
    text-align: center;
    vertical-align: middle;
  }
</style>
