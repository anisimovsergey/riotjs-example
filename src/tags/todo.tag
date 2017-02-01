
<todo>

  <h3>{ opts.title }</h3>

  <ul>
    <li each={ items.filter(whatShow) }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input ref="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.filter(whatShow).length + 1 }</button>

    <button type="button" disabled={ items.filter(onlyDone).length == 0 } onclick={ removeAllDone }>
    X{ items.filter(onlyDone).length } </button>
  </form>

  <!-- this script tag is optional -->
  <script>
    var that = this;
    var connection;
    this.items = [];

    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      if (this.text) {
        //this.items.push({ title: this.text })
        fetch('/todos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: this.text })
          }).catch(function (ex) {
            console.log(ex)
        })
        this.text = this.refs.input.value = ''
      }
      e.preventDefault()
    }

    removeAllDone(e) {
      this.items = this.items.filter(function(item) {
        return !item.done
      })
    }

    // an two example how to filter items on the list
    whatShow(item) {
      return !item.hidden
    }

    onlyDone(item) {
      return item.done
    }

    toggle(e) {
      var item = e.item
      item.done = !item.done
      return true
    }

    getTodos() {
      fetch('/todos').then(function (response) {
          return response.json()
      }).then(function (json) {
          that.items = json;
          that.update();
      }).catch(function (ex) {
          console.log(ex)
      })
    }

    addToDo(todo) {
      this.items.push(todo);
      that.update();
    }

    connectToWs() {
      that.connection = new WebSocket("ws://" + location.host + "/ws");
      that.connection.onmessage = function (e) {
        that.addToDo(JSON.parse(e.data));
      };
    }

    this.on('unmount', function() {
      if (that.connection) {
        connection.close();
      }
    })

    this.getTodos();
    this.connectToWs();
  </script>

</todo>
