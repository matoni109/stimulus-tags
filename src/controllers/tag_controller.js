import { Controller } from "@hotwired/stimulus";
import { template } from "lodash";

export default class extends Controller {
  static targets = ["input", "tagSpan", "tagTemplate", "add", "hidden"];
  static values = {
    tags: { type: Array, default: [{ text: "default_tag", key: 0 }] },
  };

  initialize() {}

  connect() {
    this.tagTemplate = template(this.tagTemplateTarget.innerHTML);

    this._renderTagTemplate();
  }

  addNewTagHandler(tag) {
    const oldTags = this.tagsValue;

    oldTags.push(tag);

    this.tagsValue = oldTags;
  }

  removeTagHandler(event) {
    const oldTags = this.tagsValue;

    const index = this.tagsValue.findIndex(
      (tag) => tag.key === event.params.key
    );

    oldTags.splice(index, 1);

    this.tagsValue = oldTags;
    this._renderTagTemplate();
  }

  _renderTagTemplate() {
    this.renderTags(this.tagsValue);
  }

  submitHandler(event) {
    let keyValue = this.amountOfTags;
    let tag = { text: this.input.value, key: keyValue };

    if (event.keyCode == 13 || event.type == "click") {
      this.addNewTagHandler(tag);
      this.clearSearch();
      this._renderTagTemplate();
    }
  }

  showAddTags() {
    if (this.input.value != "") {
      this.hidden.classList.add("block");
      this.hidden.classList.remove("hidden");
    } else {
      this.hidden.classList.add("hidden");
    }
    this.addTarget.innerText = this.input.value.toLowerCase();
  }

  renderTags = (array) => {
    this.tagSpanTarget.innerHTML = "";
    array.forEach((element) => {
      // Setup each tag
      this.tagData = {
        text: element.text,
        key: element.key,
      };
      let tagHtml = this.tagTemplate(this.tagData);

      // Pass the data to our lodash template, and it'll return a string of HTML.
      this.tagSpanTarget.insertAdjacentHTML("beforeend", tagHtml);
    });
  };

  clearSearch() {
    this.inputTarget.value = "";
    this.hidden.classList.add("hidden");
  }

  get input() {
    return this.inputTarget;
  }

  get tags() {
    return this.tagsTarget.value;
  }

  get add() {
    return this.addTarget;
  }

  get hidden() {
    return this.hiddenTarget;
  }

  get amountOfTags() {
    return this.tagsValue.length;
  }
}
