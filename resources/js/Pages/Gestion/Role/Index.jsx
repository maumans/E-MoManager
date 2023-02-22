import React from 'react';
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";

function Index({auth,errors}) {
    return (
        <AdminPanelLayout
            auth={auth}
            errors={errors}
            active={"role"}
        >
            Role Index
        </AdminPanelLayout>
    );
}

export default Index;
