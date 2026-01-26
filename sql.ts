class Builder {
  private state: { select: string[]; from: string; where: string } = {
    select: [],
    from: "",
    where: "",
  };

  constructor() {
    this.state = { select: [], from: "", where: "" };
  }

  select(...columns: string[]) {
    if (this.state.select.length > 0) throw new Error("SELECT already defined");

    this.state.select = columns;
    return this;
  }

  from(table: string) {
    if (!this.state.select.length) throw new Error("SELECT is required");
    if (this.state.from) throw new Error("FROM already defined");

    this.state.from = table;
    return this;
  }

  where(condition: string) {
    if (!this.state.from) throw new Error("FROM is required");
    if (!this.state.select.length) throw new Error("SELECT is required");
    if (this.state.where) throw new Error("WHERE already defined");

    this.state.where = condition;
    return this;
  }

  build(): string {
    let query = `SELECT ${this.state.select.join(", ")} `;
    query += `FROM ${this.state.from} `;
    query += `WHERE ${this.state.where} `;
    console.log(query);
    return query;
  }
}

const builder = new Builder();
builder.select("id", "name").from("users").where("age > 18").build();
