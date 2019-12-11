<template>
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="getGoodsList"
    >
    <van-card
    v-for="item in list"
    :key="item.id"
    :tag="item.tag"
    :price="item.price"
    :origin-price="item['origin-price']"
    :desc="item.desc"
    :title="item.title"
    :thumb="item.thumb"
    lazy-load
    @click="handleClick(item.id)"
    >
      <div slot="tags">
        <van-tag plain type="danger" v-for="tag in item.tags" :key="tag">{{tag}}
        </van-tag>
      </div>
        <div slot="bottom" class="express">
          <div>
          {{ item.express <= 0 ? "免运费" : "运费:¥ " + item.express}}
          </div>
        <div>
          {{item.sale}}付款人
        </div>
        <div>
          {{item.city}}
        </div>
        </div>
    </van-card>
    </van-list>
</template>

<script>
import { List, Card, Tag, Button } from "vant";
import { mapState } from "vuex";
export default {
  name: "list",
  components: {
    [List.name]: List,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      error: false
    };
  },
  computed: {
    ...mapState("list", {
      list: state => state.goodsList
    })
  },
  methods: {
    // onLoad() {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }
    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 500);
    // }

    getGoodsList() {
      this.$store
        .dispatch("list/getGoodsList")
        .then(isLast => {
          this.loading = false;
          if (isLast) {
            this.finished = true;
          }
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },
    handleClick(id) {
      this.$router.push(`/goods/${id}`);
    }
  }
};
</script>
<style lang="less" scoped>
.express {
  display: flex;
  justify-content: space-between;
}
</style>

