export const RunAlertMixin = {
    methods: {
        runAlert(group, title, text, time) {
            this.$notify(
                {
                    group,
                    title,
                    text
                },
                time
            );
        },
    }
}
