<script>
import Auth from '@/auth/Auth'

export default {
  mounted () {
    Auth.logout()

    this.$router.push({ name: 'login' })
  }
}
</script>
